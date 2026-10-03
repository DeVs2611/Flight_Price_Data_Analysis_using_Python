# Fare / Lab website

Live case study: https://devs2611.github.io/Flight_Price_Data_Analysis_using_Python/

The website is served by GitHub Pages from `main:/docs`. It uses plain HTML, CSS, and JavaScript with no build step, API keys, or server backend.

## Preview locally

From the repository root:

```bash
python3 -m http.server 4174 --directory docs --bind 127.0.0.1
```

Open http://127.0.0.1:4174/ in a browser.

## Refresh the data

```bash
pip install pandas openpyxl
python scripts/export_site_data.py
```

The exporter reads `flight_price.xlsx`, removes the one row with missing route/stop fields, and exports 10,682 compact records to `docs/assets/flights.json`. Duplicate rows are retained to match the original analysis. Research figures are extracted from saved notebook outputs. The recorded model scores are explicitly listed in the exporter; review them against notebook outputs if the analysis is rerun. Notebook cell positions used to extract figures may need updating if cells are reordered.

## Files

- `docs/index.html`: case-study narrative and accessible controls
- `docs/style.css`: responsive design and animations
- `docs/app.js`: client-side aggregation, metric comparison, downloads, and expanded views
- `docs/motion.js`: smooth navigation, animated disclosures/dropdowns, and code tabs
- `docs/assets/`: historical records and original research figures

Animations respect the reduced-motion system preference. Dropdowns, code tabs, and dialogs support keyboard operation. CSV downloads contain the currently filtered group summary. The site presents historical observations and recorded experimental scores; it does not run a predictive model or fetch live fares.
