# ✈️ Flight Price Prediction & Analysis (EDA + Machine Learning)

This project analyses flight price data and builds machine learning models to understand and predict airline ticket prices based on factors such as airline, route, duration, number of stops, and travel date.

It combines **Exploratory Data Analysis (EDA)**, **Feature Engineering**, and **Regression Models** to extract insights and evaluate predictive performance.

📄 A full analytical report is also included in this repository.

---

## 🎯 Project Objectives

* Understand key factors influencing flight ticket prices
* Perform structured data cleaning and feature engineering
* Build and compare multiple machine learning models
* Evaluate models using standard performance metrics
* Visualise trends and insights for decision-making

---

## 📊 Dataset

The dataset contains flight records with the following attributes:

* ✈️ Airline
* 📅 Date of Journey
* 🌍 Source and Destination
* 🕒 Departure and Arrival Time
* ⏱️ Duration
* 🛑 Total Stops
* 💰 Price

The dataset is loaded and processed directly inside the notebook.

---

## 🧠 Methodology

The notebook follows a complete data analytics and machine learning pipeline:

### 1️⃣ Data Loading & Quality Checks

* Dataset shape, missing values, and duplicates
* Initial statistical exploration

### 2️⃣ Data Cleaning & Feature Engineering

* Extracting **day, month, year** from journey dates
* Extracting **hour and minute** from time columns
* Converting flight duration into **total minutes**
* Encoding categorical variables

### 3️⃣ Exploratory Data Analysis (EDA) & KPIs

* Average price by **airline**
* Average price by **route (source → destination)**
* Price variation by **number of stops**
* Monthly and weekday price trends
* Price variation by **departure time**
* Flight volume by airline and source airport
* Busiest routes
* Average duration by airline and by stops

### 4️⃣ Machine Learning Models

The following regression models were implemented and compared:

* 📈 Linear Regression
* 🌳 Decision Tree Regressor
* 🌲 Random Forest Regressor
* 🚀 Gradient Boosting Regressor

### 5️⃣ Model Evaluation

Models were evaluated using:

* Mean Absolute Error (MAE)
* Root Mean Squared Error (RMSE)
* R² Score

Feature importance and diagnostic plots were also analysed to interpret model behaviour.

---

## 🛠️ Technologies Used

* 🐍 Python
* 🧮 Pandas, NumPy
* 📊 Matplotlib, Seaborn
* 🤖 Scikit-learn
* 📓 Jupyter Notebook / Google Colab

---

## 📁 Repository Structure

```
📦 Flight-Price-Analysis
 ┣ 📜 flight_price_analysis.ipynb   # Main notebook (EDA + ML models)
 ┣ 📄 Project_Report.pdf            # Full analytical report
 ┣ 📘 README.md                     # Project overview
 ┣ 📊 flight_price.xlsx             # Raw File
```

---

## ▶️ How to Run

### ✅ Option 1 – Google Colab

1. Open the notebook in Google Colab
2. Run all cells sequentially

### ✅ Option 2 – Local Jupyter

1. Clone the repository
2. Install dependencies:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn
```

3. Open and run the notebook in Jupyter

---

## 🏁 Key Outcomes

* Identified strong relationships between price and factors such as airline, route, number of stops, and travel month
* Demonstrated that ensemble models (**Random Forest & Gradient Boosting**) outperform simple linear models
* Built a reproducible pipeline from raw data to predictive insights
* Produced a full analytical report documenting methodology and findings

---

## 🚀 Future Enhancements

* Hyperparameter tuning and cross-validation
* Interactive dashboard (Streamlit / Power BI)
* Deployment of the best model as a web application
* Incorporation of external factors (holidays, weather, demand indicators)

---

## 👨‍💻 Author

**Dev Srivastava**
🎓 MSc Computer Science – University of Warwick
📍 United Kingdom
