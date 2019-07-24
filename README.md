### Carmichael Inventory Management System

By Roger Lester Palabasan

---

![Alt text](/public/images/ScreenShots/CarmichaelHome.png?raw=true "HomePage")

---

## What is the Carmichael?

Carmichael is a software that manages inventory and reporting through both Microsoft Excel and the web app itself.
We utilize Sheetjs (xlsx) and D3js (d3) in addition to Sequelize, Express, React, and Redux.

Although the backend is nested on Postgres, we can obtain the initial seed from "NorthWind.xlsx" by running "npm run seed".

Note: Many of the Excel dependencies have url addresses that map to the local address of said files in the developer's computer. This is because sheetjs runs in Node. In order to utilize the Excel functionalities, please remap the url address in the Excel dependencies to the local addresses of the downloaded Excel files. Because of Excel local dependency, the application must be run locally.

The Carmichael System showcases mastery of the NERD stack taught in Fullstack Academy and my former background of being an Excel Specialist. As of April 29th, 2019, it took four days to create a fully functioning system and a client dashboard.

---

## Walkthrough

Carmichael provides companies with full access to their inventory, sortable by all available parameters, and specific category. The example below shows all Confections, sorted by ProductName in descending order:

![Alt text](/public/images/ScreenShots/InventoryConfectionsOrderByProductNameDesc.png?raw=true "Inventory Confections")

Companies can also input orders directly into Carmichael. In this example, our company is placing an order from a client, La Maison d'Asie. They want to order $322.26 of Chang and Pavlova. The invoice is numbered 11079.

![Alt text](/public/images/ScreenShots/OrderRequestLaMaison.png?raw=true "Order Request")

The Orders tab gives us a list of all orders specified client name, which is sortable as well. We can see all of La Maison's orders, including the one we just created.

![Alt text](/public/images/ScreenShots/OrdersLaMaison.png?raw=true "Order Tab")

If we want to see an overview of how profitable clients are, we can see this on the Revenue Tab. La Maison is quite profitable with 18.09% Gross Profit Margin. We can see they love to order mostly Meat, Confections, and Beverages. Let's ensure that we have enough inventory in case La Maison wants to order more!

![Alt text](/public/images/ScreenShots/LaMaisonAnalysis.png?raw=true "LaMaisonAnalysis")
