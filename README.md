# Flight Price Analysis

This project analyzes flight price data to uncover insights and trends related to various factors like airline, route, time of travel, and number of stops. The analysis is performed using Python and popular data science libraries like Pandas, NumPy, Matplotlib, and Seaborn within a Google Colab environment.

## Project Description

The goal of this project is to explore and understand the factors that influence flight prices. By analyzing a dataset of flight information, we aim to identify key performance indicators (KPIs) and visualize trends to gain a deeper understanding of the flight market.

## Dataset

The dataset used in this project is sourced from a GitHub repository and contains detailed information about flights, including:

- Airline
- Date of Journey
- Source and Destination airports
- Departure and Arrival times
- Duration of the flight
- Total stops
- Price

The dataset is loaded and processed within the Colab notebook.

## Analysis and Key Findings

The project performs a comprehensive analysis of the flight price data, covering the following areas:

- **Overall Data Exploration:** Loading, describing, and checking for null values in the dataset.
- **Column-wise Analysis:** Detailed examination and processing of individual columns like 'Airline', 'Date_of_Journey', 'Dep_Time', 'Arrival_Time', 'Duration', 'Route', and 'Total_Stops'.
- **KPI Analysis:** Calculation and visualization of key metrics such as:
    - Average Ticket Price by Airline
    - Average Ticket Price by Route (Source → Destination)
    - Average Price by Number of Stops
    - Flight Volume by Airline
    - Flight Volume by Source Airport
    - Monthly Price Trend
    - Average Departure Hour by Airline
    - Busiest routes (most frequent source-destination pairs)
    - Price variation depending on the time of day (departure hour)
    - Price variation depending on the day of the week or month
    - Airlines with the highest average duration for non-stop flights
    - Average arrival hour by airline
    - Average duration of flights by airline
    - Average duration of flights by number of stops

The notebook includes code for data cleaning, feature engineering (e.g., extracting day, month, year, hour, and minute from time columns, calculating duration in minutes), and generating visualizations to support the findings.

## Technologies Used

- Python
- Pandas (for data manipulation and analysis)
- NumPy (for numerical operations)
- Matplotlib (for data visualization)
- Seaborn (for enhanced data visualization)
- Google Colab

## How to Run the Project

1. **Open the Notebook:** The project is designed to be run in Google Colab. Open the provided `.ipynb` notebook file in Google Colab.
2. **Run the Cells:** Execute the code cells sequentially. The notebook is structured to perform data loading, cleaning, analysis, and visualization step by step.
3. **Explore the Output:** Observe the output of each cell, including dataframes, descriptive statistics, and visualizations, to understand the findings.

Alternatively, you can clone this repository to your local machine and run the notebook in a Jupyter environment with the required libraries installed.

## Repository Structure

- `flight_price.ipynb`: The main Google Colab notebook containing the code for data analysis and visualization.
- `README.md`: This file, providing an overview of the project.

## Future Enhancements

- Implement machine learning models to predict flight prices.
- Explore additional factors that might influence flight prices, such as seasonality, holidays, and special events.
- Create an interactive dashboard to visualize the findings.
