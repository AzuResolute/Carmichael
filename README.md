Carmichael Inventory Management System

By Roger Lester Palabasan

---

What is the Carmichael?

Carmichael is a software that manages inventory and reporting through both Microsoft Excel and the web app itself.
We utilize Sheetjs (xlsx) and D3js (d3) in addition to Sequelize, Express, React, and Redux.

Although the backend is nested on PostGres, we can obtain the initial seed from "NorthWind.xlsx" by running "npm run seed".

Note: Many of the Excel dependencies have url addresses that map to the local address of said files in the developer's computer. This is because sheetjs runs in Node. In order to utilize the Excel functionalities, please change the url address to the local addresses of the downloaded Excel files. That said, the app can function without Excel files as long as you have PostGres and Excel.

---

The Carmichael System showcases mastery of the NERD stack taught in Fullstack Academy and my former background of being an Excel Specialist. As of April 29th, 2019, it took four days to create a fully functioning system and a client dashboard.

The following updates are planned for the future:
  - Inventory Dashboard:
    - AR Turnover
    - Supply/Demand
    - Yearly Comparison
  - Overview Dashboard
    - Net Revenue
    - ROI, Liquidity, Trends, etc
    - Interact with an Accounting System
  - Suppliers Dashboard, Reporting, and Management
