title: Sales Forecasting Dashboard
image: project_images/sales-forecasting.png
code_url: https://github.com/farheen/sales-forecasting-dashboard
---
**An end-to-end retail forecasting pipeline: raw transactions in, a 90-day revenue forecast out, visualised in Power BI.**

Built on the *Online Retail II* dataset, real transactions from a UK-based online gift retailer. The pipeline turns about a year of messy invoice lines (307 trading days, roughly £8.85M of UK revenue) into a clean daily revenue series, then forecasts the next 90 days.

### Pipeline

**Excel → Python ETL → Prophet forecast → CSV → Power BI**

- **Cleaning:** drops incomplete invoice lines and removes returns and zero-price adjustments (negative quantities and prices), then computes revenue per line.
- **Focus:** keeps the United Kingdom, the market with by far the most data, so the model learns from a consistent signal.
- **Aggregation:** rolls thousands of transactions up into daily revenue.
- **Forecasting:** Meta's **Prophet** models trend plus weekly and yearly seasonality, and produces a forecast with upper and lower uncertainty bounds.
- **Dashboard:** the actuals and the forecast feed a Power BI report for interactive exploration.

### What the forecast shows

- A sharp rise in revenue from **October into the Christmas season**, typical for a gift retailer.
- A strong **weekly rhythm**: the store doesn't trade on Saturdays, and the model learns that dip.
- An **uncertainty band** that widens further into the future, a reminder that forecasts are ranges, not promises.

### Tech stack

Python · pandas · Prophet · Power BI
