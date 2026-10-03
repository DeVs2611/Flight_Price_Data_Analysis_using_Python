from pathlib import Path
import base64
import json
import re
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'docs' / 'assets'
ASSETS.mkdir(parents=True, exist_ok=True)
raw = pd.read_excel(ROOT / 'flight_price.xlsx')
df = raw.dropna(subset=['Route', 'Total_Stops']).copy()
dates = pd.to_datetime(df['Date_of_Journey'], dayfirst=True)
airlines = sorted(df['Airline'].unique().tolist())
route_pairs = sorted(set(zip(df['Source'], df['Destination'])))
city = {'Banglore': 'Bengaluru', 'Cochin': 'Kochi'}
routes = [f'{city.get(a,a)} → {city.get(b,b)}' for a,b in route_pairs]
rows = []
for (_, r), date in zip(df.iterrows(), dates):
    duration = str(r['Duration'])
    hours = re.search(r'(\d+)h', duration)
    minutes = re.search(r'(\d+)m', duration)
    total = (int(hours.group(1)) * 60 if hours else 0) + (int(minutes.group(1)) if minutes else 0)
    stops = 0 if r['Total_Stops'] == 'non-stop' else int(r['Total_Stops'][0])
    rows.append([airlines.index(r['Airline']), route_pairs.index((r['Source'],r['Destination'])), stops, date.month, total, int(r['Price'])])
models = [
    {'name':'Mean baseline','mae':3676.40,'rmse':4643.71,'r2':None,'cv':None},
    {'name':'Linear Regression','mae':1975.10,'rmse':2854.20,'r2':.62,'cv':2828.05},
    {'name':'Decision Tree','mae':1217.21,'rmse':2233.49,'r2':.77,'cv':2280.10},
    {'name':'Random Forest','mae':1154.24,'rmse':1975.17,'r2':.82,'cv':2055.28},
    {'name':'Gradient Boosting','mae':1334.61,'rmse':1906.70,'r2':.83,'cv':None}
]
notebook=json.loads((ROOT/'Flight_Price.ipynb').read_text())
for index,name in [(68,'airline-volume'),(72,'monthly-fares'),(94,'linear-diagnostics'),(100,'feature-importance'),(116,'boosting-predictions')]:
    for number,output in enumerate(o for o in notebook['cells'][index].get('outputs',[]) if 'image/png' in o.get('data',{})):
        (ASSETS/f'{name}-{number}.png').write_bytes(base64.b64decode(output['data']['image/png']))
summary = {'raw':len(raw),'clean':len(df),'duplicates':int(df.duplicated().sum()),'mean':round(df.Price.mean(),2),'median':float(df.Price.median()),'monthly':[{'month':int(m),'mean':round(df.loc[dates.dt.month==m,'Price'].mean(),2)} for m in sorted(dates.dt.month.unique())]}
(ASSETS/'flights.json').write_text(json.dumps({'airlines':airlines,'routes':routes,'rows':rows,'models':models,'summary':summary},separators=(',',':')))
assert len(rows)==10682
print(json.dumps(summary,indent=2))
print('RMSE improvement:',(1-1906.70/4643.71)*100)
print('MAE improvement:',(1-1154.24/3676.4)*100)
print('Route counts',df.groupby(['Source','Destination']).size().to_dict())
