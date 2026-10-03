'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const money = n => '₹' + n.toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2});
  const number = n => n.toLocaleString('en-IN');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const months = {3:'March',4:'April',5:'May',6:'June'};
  let data, filtered = [], group = 0, metric = 'rmse', summary = [];
  const filters = [['airline-filter',0],['route-filter',1],['stops-filter',2],['month-filter',3]];
  function animateBars(container) {
    if(reduce.matches) return;
    container.querySelectorAll('.bar-fill').forEach((bar,i) => bar.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}], {duration:850,delay:i*25,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
  }
  function bar(label, detail, value, max, display, winner=false) {
    const row=document.createElement('div');row.className='bar-row'+(winner?' winner':'');
    const name=document.createElement('div');name.className='bar-label';name.textContent=label;
    if(detail){const small=document.createElement('small');small.textContent=detail;name.append(small);}
    const track=document.createElement('div');track.className='bar-track';track.setAttribute('aria-hidden','true');
    const fill=document.createElement('div');fill.className='bar-fill';fill.style.width=`${max?value/max*100:0}%`;track.append(fill);
    const score=document.createElement('span');score.className='bar-value';score.textContent=display;row.append(name,track,score);return row;
  }
  function renderFares() {
    if(!data)return;
    filtered=data.rows.filter(row=>filters.every(([id,col])=>$(id).value==='all'||row[col]===Number($(id).value)));
    const count=filtered.length, prices=filtered.map(r=>r[5]).sort((a,b)=>a-b);
    $('match-count').textContent=number(count);
    $('mean-fare').textContent=count?money(prices.reduce((a,b)=>a+b,0)/count):'—';
    $('median-fare').textContent=count?money(count%2?prices[(count-1)/2]:(prices[count/2-1]+prices[count/2])/2):'—';
    const duration=count?Math.round(filtered.reduce((s,r)=>s+r[4],0)/count):0;
    $('mean-duration').textContent=count?`${Math.floor(duration/60)}h ${duration%60}m`:'—';
    $('group-label').textContent={0:'airline',2:'stops',3:'month'}[group];
    const groups=new Map();filtered.forEach(row=>{const key=row[group];if(!groups.has(key))groups.set(key,[]);groups.get(key).push(row[5]);});
    summary=[...groups].map(([key,values])=>({key,label:group===0?data.airlines[key]:group===2?(key?`${key} ${key===1?'stop':'stops'}`:'Non-stop'):months[key],count:values.length,mean:values.reduce((a,b)=>a+b,0)/values.length}));
    summary.sort(group===0?(a,b)=>b.mean-a.mean:(a,b)=>a.key-b.key);
    const container=$('fare-bars');container.replaceChildren();
    if(!count){const empty=document.createElement('div');empty.className='empty-state';const title=document.createElement('h3');title.textContent='No flights in this combination';const p=document.createElement('p');p.textContent='Try another route or reset the filters to explore the full dataset.';empty.append(title,p);container.append(empty);}
    else {const max=Math.max(...summary.map(r=>r.mean));summary.forEach(r=>container.append(bar(r.label,`${number(r.count)} ${r.count===1?'record':'records'}${r.count<20?' · small sample':''}`,r.mean,max,money(r.mean))));animateBars(container);}
    $('sample-note').textContent=count?'Groups under 20 records are marked as small samples.':'No matching records. All figures refer to the historical dataset.';
    $('download-summary').disabled=!count;
  }
  const metricInfo={rmse:['RMSE · lower is better · emphasizes larger errors','Gradient Boosting has the lowest recorded RMSE. Squaring errors gives larger mistakes more influence.'],mae:['MAE · lower is better · average absolute error in rupees','Random Forest has the lowest recorded MAE. It is the leading model when average absolute error is the priority.'],r2:['R² · higher is better · goodness of fit on the recorded split','Gradient Boosting has the highest recorded R² at 0.83. This is not “83% accuracy.” The baseline R² was not reported.'],cv:['5-fold mean RMSE · lower is better · reported models only','Random Forest leads the three models with recorded cross-validation results. Gradient Boosting was not cross-validated; test-based tree tuning also limits this comparison.']};
  function renderModels(){
    if(!data)return;
    const models=data.models.filter(m=>m[metric]!==null).sort((a,b)=>metric==='r2'?b[metric]-a[metric]:a[metric]-b[metric]);
    $('metric-description').textContent=metricInfo[metric][0];$('metric-insight').textContent=metricInfo[metric][1];
    const max=metric==='r2'?1:Math.max(...models.map(m=>m[metric]));$('model-bars').replaceChildren();
    models.forEach((m,i)=>$('model-bars').append(bar(m.name,i===0?'Best recorded score':'',m[metric],max,metric==='r2'?m[metric].toFixed(2):money(m[metric]),i===0)));animateBars($('model-bars'));
  }
  filters.forEach(([id])=>$(id).addEventListener('change',renderFares));
  $('reset-filters').addEventListener('click',()=>{filters.forEach(([id])=>{$(id).value='all';$(id).dispatchEvent(new Event('change'));});});
  for(const [id,attribute,render] of [['group-controls','group',renderFares],['metric-controls','metric',renderModels]]){
    $(id).querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{if(attribute==='group')group=Number(button.dataset.group);else metric=button.dataset.metric;$(id).querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();}));
  }
  $('download-summary').addEventListener('click',()=>{
    const selected=filters.map(([id])=>$(id).selectedOptions[0].textContent).join(' | ');
    const csv='\uFEFF'+[['Historical flight fares (2019)',selected],['Group','Records','Mean fare (INR)'],...summary.map(r=>[r.label,r.count,r.mean.toFixed(2)])].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'})),a=document.createElement('a');a.href=url;a.download='fare-lab-2019-summary.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  fetch('assets/flights.json').then(r=>{if(!r.ok)throw Error('Data unavailable');return r.json();}).then(result=>{
    data=result;
    [['airline-filter',data.airlines],['route-filter',data.routes]].forEach(([id,items])=>items.forEach((label,index)=>{const option=document.createElement('option');option.value=index;option.textContent=label;$(id).append(option);}));
    data.models.forEach(model=>{const tr=document.createElement('tr');[model.name,...['mae','rmse','r2','cv'].map(k=>model[k]===null?'—':model[k].toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}))].forEach((value,i)=>{const td=document.createElement(i?'td':'th');if(!i)td.scope='row';td.textContent=value;tr.append(td);});$('model-table').append(tr);});
    renderFares();renderModels();
  }).catch(()=>{$('fare-bars').textContent='The data could not be loaded. Refresh the page to retry, or open the source workbook below.';$('model-bars').textContent='The comparison could not be loaded. The headline recorded scores remain available above.';});
  const dialog=$('detail-dialog'),content=$('dialog-content');let placeholder,returnFocus,closing=false;
  function openDialog(title,trigger){returnFocus=trigger;$('dialog-title').textContent=title;dialog.showModal();document.body.style.overflow='hidden';$('close-dialog').focus({preventScroll:true});if(!reduce.matches)dialog.animate([{opacity:0,transform:'translateY(32px) scale(.95)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});}
  async function closeDialog(){if(closing||!dialog.open)return;closing=true;if(!reduce.matches)await dialog.animate([{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(18px) scale(.98)'}],{duration:380,easing:'ease-in'}).finished;dialog.close();document.body.style.overflow='';if(placeholder){placeholder.replaceWith($('explorer-panel'));placeholder=null;$('expand-explorer').hidden=false;}content.replaceChildren();returnFocus?.focus({preventScroll:true});closing=false;}
  $('close-dialog').addEventListener('click',closeDialog);dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog();});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
  $('expand-explorer').addEventListener('click',e=>{const panel=$('explorer-panel');placeholder=document.createElement('div');placeholder.style.height=panel.offsetHeight+'px';panel.before(placeholder);content.replaceChildren(panel);$('expand-explorer').hidden=true;openDialog('Explore historical flight fares',e.currentTarget);});
  document.querySelectorAll('.figure-open').forEach(button=>button.addEventListener('click',()=>{const img=document.createElement('img');img.src=button.dataset.image;img.alt=button.dataset.title;const p=document.createElement('p');p.textContent=button.dataset.description;content.replaceChildren(img,p);openDialog(button.dataset.title,button);}));
  $('motion-toggle').addEventListener('click',()=>{const paused=document.querySelector('.hero-dashboard').classList.toggle('animation-paused');$('motion-toggle').textContent=paused?'▷':'Ⅱ';$('motion-toggle').setAttribute('aria-label',paused?'Resume animation':'Pause animation');});
  function progress(){const length=document.documentElement.scrollHeight-innerHeight;document.querySelector('.read-progress').style.width=(length?scrollY/length*100:0)+'%';}
  addEventListener('scroll',progress,{passive:true});addEventListener('resize',progress);progress();
})();
