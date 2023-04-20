"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
(0, database_1.createPurchase)("U3", "P3", 2, 78.8);
console.table((0, database_1.getAllPurchasesFromUserId)("U3"));
//# sourceMappingURL=index.js.map