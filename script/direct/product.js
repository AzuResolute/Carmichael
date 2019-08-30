const products = [
    {	ProductID: 1,	ProductName: "Chai",	CategoryID: 1,	QuantityPerUnit: "10 boxes x 20 bags",	UnitPrice: 18,	UnitsInStock: 39,	Discontinued: "FALSE"	},
    {	ProductID: 2,	ProductName: "Chang",	CategoryID: 1,	QuantityPerUnit: "24 - 12 oz bottles",	UnitPrice: 19,	UnitsInStock: 17,	Discontinued: "FALSE"	},
    {	ProductID: 3,	ProductName: "Aniseed Syrup",	CategoryID: 2,	QuantityPerUnit: "12 - 550 ml bottles",	UnitPrice: 10,	UnitsInStock: 13,	Discontinued: "FALSE"	},
    {	ProductID: 4,	ProductName: "Chef Anton's Cajun Seasoning",	CategoryID: 2,	QuantityPerUnit: "48 - 6 oz jars",	UnitPrice: 22,	UnitsInStock: 53,	Discontinued: "FALSE"	},
    {	ProductID: 5,	ProductName: "Chef Anton's Gumbo Mix",	CategoryID: 2,	QuantityPerUnit: "36 boxes",	UnitPrice: 21.35,	UnitsInStock: 0,	Discontinued: "TRUE"	},
    {	ProductID: 6,	ProductName: "Grandma's Boysenberry Spread",	CategoryID: 2,	QuantityPerUnit: "12 - 8 oz jars",	UnitPrice: 25,	UnitsInStock: 120,	Discontinued: "FALSE"	},
    {	ProductID: 7,	ProductName: "Uncle Bob's Organic Dried Pears",	CategoryID: 7,	QuantityPerUnit: "12 - 1 lb pkgs.",	UnitPrice: 30,	UnitsInStock: 15,	Discontinued: "FALSE"	},
    {	ProductID: 8,	ProductName: "Northwoods Cranberry Sauce",	CategoryID: 2,	QuantityPerUnit: "12 - 12 oz jars",	UnitPrice: 40,	UnitsInStock: 6,	Discontinued: "FALSE"	},
    {	ProductID: 9,	ProductName: "Mishi Kobe Niku",	CategoryID: 6,	QuantityPerUnit: "18 - 500 g pkgs.",	UnitPrice: 97,	UnitsInStock: 29,	Discontinued: "TRUE"	},
    {	ProductID: 10,	ProductName: "Ikura",	CategoryID: 8,	QuantityPerUnit: "12 - 200 ml jars",	UnitPrice: 31,	UnitsInStock: 31,	Discontinued: "FALSE"	},
    {	ProductID: 11,	ProductName: "Queso Cabrales",	CategoryID: 4,	QuantityPerUnit: "1 kg pkg.",	UnitPrice: 21,	UnitsInStock: 22,	Discontinued: "FALSE"	},
    {	ProductID: 12,	ProductName: "Queso Manchego La Pastora",	CategoryID: 4,	QuantityPerUnit: "10 - 500 g pkgs.",	UnitPrice: 38,	UnitsInStock: 86,	Discontinued: "FALSE"	},
    {	ProductID: 13,	ProductName: "Konbu",	CategoryID: 8,	QuantityPerUnit: "2 kg box",	UnitPrice: 6,	UnitsInStock: 24,	Discontinued: "FALSE"	},
    {	ProductID: 14,	ProductName: "Tofu",	CategoryID: 7,	QuantityPerUnit: "40 - 100 g pkgs.",	UnitPrice: 23.25,	UnitsInStock: 35,	Discontinued: "FALSE"	},
    {	ProductID: 15,	ProductName: "Genen Shouyu",	CategoryID: 2,	QuantityPerUnit: "24 - 250 ml bottles",	UnitPrice: 15.5,	UnitsInStock: 39,	Discontinued: "FALSE"	},
    {	ProductID: 16,	ProductName: "Pavlova",	CategoryID: 3,	QuantityPerUnit: "32 - 500 g boxes",	UnitPrice: 17.45,	UnitsInStock: 29,	Discontinued: "FALSE"	},
    {	ProductID: 17,	ProductName: "Alice Mutton",	CategoryID: 6,	QuantityPerUnit: "20 - 1 kg tins",	UnitPrice: 39,	UnitsInStock: 0,	Discontinued: "TRUE"	},
    {	ProductID: 18,	ProductName: "Carnarvon Tigers",	CategoryID: 8,	QuantityPerUnit: "16 kg pkg.",	UnitPrice: 62.5,	UnitsInStock: 42,	Discontinued: "FALSE"	},
    {	ProductID: 19,	ProductName: "Teatime Chocolate Biscuits",	CategoryID: 3,	QuantityPerUnit: "10 boxes x 12 pieces",	UnitPrice: 9.2,	UnitsInStock: 25,	Discontinued: "FALSE"	},
    {	ProductID: 20,	ProductName: "Sir Rodney's Marmalade",	CategoryID: 3,	QuantityPerUnit: "30 gift boxes",	UnitPrice: 81,	UnitsInStock: 40,	Discontinued: "FALSE"	},
    {	ProductID: 21,	ProductName: "Sir Rodney's Scones",	CategoryID: 3,	QuantityPerUnit: "24 pkgs. x 4 pieces",	UnitPrice: 10,	UnitsInStock: 3,	Discontinued: "FALSE"	},
    {	ProductID: 22,	ProductName: "Gustaf's Knäckebröd",	CategoryID: 5,	QuantityPerUnit: "24 - 500 g pkgs.",	UnitPrice: 21,	UnitsInStock: 104,	Discontinued: "FALSE"	},
    {	ProductID: 23,	ProductName: "Tunnbröd",	CategoryID: 5,	QuantityPerUnit: "12 - 250 g pkgs.",	UnitPrice: 9,	UnitsInStock: 61,	Discontinued: "FALSE"	},
    {	ProductID: 24,	ProductName: "Guaraná Fantástica",	CategoryID: 1,	QuantityPerUnit: "12 - 355 ml cans",	UnitPrice: 4.5,	UnitsInStock: 20,	Discontinued: "TRUE"	},
    {	ProductID: 25,	ProductName: "NuNuCa Nuß-Nougat-Creme",	CategoryID: 3,	QuantityPerUnit: "20 - 450 g glasses",	UnitPrice: 14,	UnitsInStock: 76,	Discontinued: "FALSE"	},
    {	ProductID: 26,	ProductName: "Gumbär Gummibärchen",	CategoryID: 3,	QuantityPerUnit: "100 - 250 g bags",	UnitPrice: 31.23,	UnitsInStock: 15,	Discontinued: "FALSE"	},
    {	ProductID: 27,	ProductName: "Schoggi Schokolade",	CategoryID: 3,	QuantityPerUnit: "100 - 100 g pieces",	UnitPrice: 43.9,	UnitsInStock: 49,	Discontinued: "FALSE"	},
    {	ProductID: 28,	ProductName: "Rössle Sauerkraut",	CategoryID: 7,	QuantityPerUnit: "25 - 825 g cans",	UnitPrice: 45.6,	UnitsInStock: 26,	Discontinued: "TRUE"	},
    {	ProductID: 29,	ProductName: "Thüringer Rostbratwurst",	CategoryID: 6,	QuantityPerUnit: "50 bags x 30 sausgs.",	UnitPrice: 123.79,	UnitsInStock: 0,	Discontinued: "TRUE"	},
    {	ProductID: 30,	ProductName: "Nord-Ost Matjeshering",	CategoryID: 8,	QuantityPerUnit: "10 - 200 g glasses",	UnitPrice: 25.89,	UnitsInStock: 10,	Discontinued: "FALSE"	},
    {	ProductID: 31,	ProductName: "Gorgonzola Telino",	CategoryID: 4,	QuantityPerUnit: "12 - 100 g pkgs",	UnitPrice: 12.5,	UnitsInStock: 0,	Discontinued: "FALSE"	},
    {	ProductID: 32,	ProductName: "Mascarpone Fabioli",	CategoryID: 4,	QuantityPerUnit: "24 - 200 g pkgs.",	UnitPrice: 32,	UnitsInStock: 9,	Discontinued: "FALSE"	},
    {	ProductID: 33,	ProductName: "Geitost",	CategoryID: 4,	QuantityPerUnit: "500 g",	UnitPrice: 2.5,	UnitsInStock: 112,	Discontinued: "FALSE"	},
    {	ProductID: 34,	ProductName: "Sasquatch Ale",	CategoryID: 1,	QuantityPerUnit: "24 - 12 oz bottles",	UnitPrice: 14,	UnitsInStock: 111,	Discontinued: "FALSE"	},
    {	ProductID: 35,	ProductName: "Steeleye Stout",	CategoryID: 1,	QuantityPerUnit: "24 - 12 oz bottles",	UnitPrice: 18,	UnitsInStock: 20,	Discontinued: "FALSE"	},
    {	ProductID: 36,	ProductName: "Inlagd Sill",	CategoryID: 8,	QuantityPerUnit: "24 - 250 g  jars",	UnitPrice: 19,	UnitsInStock: 112,	Discontinued: "FALSE"	},
    {	ProductID: 37,	ProductName: "Gravad lax",	CategoryID: 8,	QuantityPerUnit: "12 - 500 g pkgs.",	UnitPrice: 26,	UnitsInStock: 11,	Discontinued: "FALSE"	},
    {	ProductID: 38,	ProductName: "Côte de Blaye",	CategoryID: 1,	QuantityPerUnit: "12 - 75 cl bottles",	UnitPrice: 263.5,	UnitsInStock: 17,	Discontinued: "FALSE"	},
    {	ProductID: 39,	ProductName: "Chartreuse verte",	CategoryID: 1,	QuantityPerUnit: "750 cc per bottle",	UnitPrice: 18,	UnitsInStock: 69,	Discontinued: "FALSE"	},
    {	ProductID: 40,	ProductName: "Boston Crab Meat",	CategoryID: 8,	QuantityPerUnit: "24 - 4 oz tins",	UnitPrice: 18.4,	UnitsInStock: 123,	Discontinued: "FALSE"	},
    {	ProductID: 41,	ProductName: "Jack's New England Clam Chowder",	CategoryID: 8,	QuantityPerUnit: "12 - 12 oz cans",	UnitPrice: 9.65,	UnitsInStock: 85,	Discontinued: "FALSE"	},
    {	ProductID: 42,	ProductName: "Singaporean Hokkien Fried Mee",	CategoryID: 5,	QuantityPerUnit: "32 - 1 kg pkgs.",	UnitPrice: 14,	UnitsInStock: 26,	Discontinued: "TRUE"	},
    {	ProductID: 43,	ProductName: "Ipoh Coffee",	CategoryID: 1,	QuantityPerUnit: "16 - 500 g tins",	UnitPrice: 46,	UnitsInStock: 17,	Discontinued: "FALSE"	},
    {	ProductID: 44,	ProductName: "Gula Malacca",	CategoryID: 2,	QuantityPerUnit: "20 - 2 kg bags",	UnitPrice: 19.45,	UnitsInStock: 27,	Discontinued: "FALSE"	},
    {	ProductID: 45,	ProductName: "Røgede sild",	CategoryID: 8,	QuantityPerUnit: "1k pkg.",	UnitPrice: 9.5,	UnitsInStock: 5,	Discontinued: "FALSE"	},
    {	ProductID: 46,	ProductName: "Spegesild",	CategoryID: 8,	QuantityPerUnit: "4 - 450 g glasses",	UnitPrice: 12,	UnitsInStock: 95,	Discontinued: "FALSE"	},
    {	ProductID: 47,	ProductName: "Zaanse koeken",	CategoryID: 3,	QuantityPerUnit: "10 - 4 oz boxes",	UnitPrice: 9.5,	UnitsInStock: 36,	Discontinued: "FALSE"	},
    {	ProductID: 48,	ProductName: "Chocolade",	CategoryID: 3,	QuantityPerUnit: "10 pkgs.",	UnitPrice: 12.75,	UnitsInStock: 15,	Discontinued: "FALSE"	},
    {	ProductID: 49,	ProductName: "Maxilaku",	CategoryID: 3,	QuantityPerUnit: "24 - 50 g pkgs.",	UnitPrice: 20,	UnitsInStock: 10,	Discontinued: "FALSE"	},
    {	ProductID: 50,	ProductName: "Valkoinen suklaa",	CategoryID: 3,	QuantityPerUnit: "12 - 100 g bars",	UnitPrice: 16.25,	UnitsInStock: 65,	Discontinued: "FALSE"	},
    {	ProductID: 51,	ProductName: "Manjimup Dried Apples",	CategoryID: 7,	QuantityPerUnit: "50 - 300 g pkgs.",	UnitPrice: 53,	UnitsInStock: 20,	Discontinued: "FALSE"	},
    {	ProductID: 52,	ProductName: "Filo Mix",	CategoryID: 5,	QuantityPerUnit: "16 - 2 kg boxes",	UnitPrice: 7,	UnitsInStock: 38,	Discontinued: "FALSE"	},
    {	ProductID: 53,	ProductName: "Perth Pasties",	CategoryID: 6,	QuantityPerUnit: "48 pieces",	UnitPrice: 32.8,	UnitsInStock: 0,	Discontinued: "TRUE"	},
    {	ProductID: 54,	ProductName: "Tourtière",	CategoryID: 6,	QuantityPerUnit: "16 pies",	UnitPrice: 7.45,	UnitsInStock: 21,	Discontinued: "FALSE"	},
    {	ProductID: 55,	ProductName: "Pâté chinois",	CategoryID: 6,	QuantityPerUnit: "24 boxes x 2 pies",	UnitPrice: 24,	UnitsInStock: 115,	Discontinued: "FALSE"	},
    {	ProductID: 56,	ProductName: "Gnocchi di nonna Alice",	CategoryID: 5,	QuantityPerUnit: "24 - 250 g pkgs.",	UnitPrice: 38,	UnitsInStock: 21,	Discontinued: "FALSE"	},
    {	ProductID: 57,	ProductName: "Ravioli Angelo",	CategoryID: 5,	QuantityPerUnit: "24 - 250 g pkgs.",	UnitPrice: 19.5,	UnitsInStock: 36,	Discontinued: "FALSE"	},
    {	ProductID: 58,	ProductName: "Escargots de Bourgogne",	CategoryID: 8,	QuantityPerUnit: "24 pieces",	UnitPrice: 13.25,	UnitsInStock: 62,	Discontinued: "FALSE"	},
    {	ProductID: 59,	ProductName: "Raclette Courdavault",	CategoryID: 4,	QuantityPerUnit: "5 kg pkg.",	UnitPrice: 55,	UnitsInStock: 79,	Discontinued: "FALSE"	},
    {	ProductID: 60,	ProductName: "Camembert Pierrot",	CategoryID: 4,	QuantityPerUnit: "15 - 300 g rounds",	UnitPrice: 34,	UnitsInStock: 19,	Discontinued: "FALSE"	},
    {	ProductID: 61,	ProductName: "Sirop d'érable",	CategoryID: 2,	QuantityPerUnit: "24 - 500 ml bottles",	UnitPrice: 28.5,	UnitsInStock: 113,	Discontinued: "FALSE"	},
    {	ProductID: 62,	ProductName: "Tarte au sucre",	CategoryID: 3,	QuantityPerUnit: "48 pies",	UnitPrice: 49.3,	UnitsInStock: 17,	Discontinued: "FALSE"	},
    {	ProductID: 63,	ProductName: "Vegie-spread",	CategoryID: 2,	QuantityPerUnit: "15 - 625 g jars",	UnitPrice: 43.9,	UnitsInStock: 24,	Discontinued: "FALSE"	},
    {	ProductID: 64,	ProductName: "Wimmers gute Semmelknödel",	CategoryID: 5,	QuantityPerUnit: "20 bags x 4 pieces",	UnitPrice: 33.25,	UnitsInStock: 22,	Discontinued: "FALSE"	},
    {	ProductID: 65,	ProductName: "Louisiana Fiery Hot Pepper Sauce",	CategoryID: 2,	QuantityPerUnit: "32 - 8 oz bottles",	UnitPrice: 21.05,	UnitsInStock: 76,	Discontinued: "FALSE"	},
    {	ProductID: 66,	ProductName: "Louisiana Hot Spiced Okra",	CategoryID: 2,	QuantityPerUnit: "24 - 8 oz jars",	UnitPrice: 17,	UnitsInStock: 4,	Discontinued: "FALSE"	},
    {	ProductID: 67,	ProductName: "Laughing Lumberjack Lager",	CategoryID: 1,	QuantityPerUnit: "24 - 12 oz bottles",	UnitPrice: 14,	UnitsInStock: 52,	Discontinued: "FALSE"	},
    {	ProductID: 68,	ProductName: "Scottish Longbreads",	CategoryID: 3,	QuantityPerUnit: "10 boxes x 8 pieces",	UnitPrice: 12.5,	UnitsInStock: 6,	Discontinued: "FALSE"	},
    {	ProductID: 69,	ProductName: "Gudbrandsdalsost",	CategoryID: 4,	QuantityPerUnit: "10 kg pkg.",	UnitPrice: 36,	UnitsInStock: 26,	Discontinued: "FALSE"	},
    {	ProductID: 70,	ProductName: "Outback Lager",	CategoryID: 1,	QuantityPerUnit: "24 - 355 ml bottles",	UnitPrice: 15,	UnitsInStock: 15,	Discontinued: "FALSE"	},
    {	ProductID: 71,	ProductName: "Fløtemysost",	CategoryID: 4,	QuantityPerUnit: "10 - 500 g pkgs.",	UnitPrice: 21.5,	UnitsInStock: 26,	Discontinued: "FALSE"	},
    {	ProductID: 72,	ProductName: "Mozzarella di Giovanni",	CategoryID: 4,	QuantityPerUnit: "24 - 200 g pkgs.",	UnitPrice: 34.8,	UnitsInStock: 14,	Discontinued: "FALSE"	},
    {	ProductID: 73,	ProductName: "Röd Kaviar",	CategoryID: 8,	QuantityPerUnit: "24 - 150 g jars",	UnitPrice: 15,	UnitsInStock: 101,	Discontinued: "FALSE"	},
    {	ProductID: 74,	ProductName: "Longlife Tofu",	CategoryID: 7,	QuantityPerUnit: "5 kg pkg.",	UnitPrice: 10,	UnitsInStock: 4,	Discontinued: "FALSE"	},
    {	ProductID: 75,	ProductName: "Rhönbräu Klosterbier",	CategoryID: 1,	QuantityPerUnit: "24 - 0.5 l bottles",	UnitPrice: 7.75,	UnitsInStock: 125,	Discontinued: "FALSE"	},
    {	ProductID: 76,	ProductName: "Lakkalikööri",	CategoryID: 1,	QuantityPerUnit: "500 ml",	UnitPrice: 18,	UnitsInStock: 57,	Discontinued: "FALSE"	},
    {	ProductID: 77,	ProductName: "Original Frankfurter grüne Soße",	CategoryID: 2,	QuantityPerUnit: "12 boxes",	UnitPrice: 13,	UnitsInStock: 32,	Discontinued: "FALSE"	}    
]

module.exports = products