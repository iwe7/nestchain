"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_db_1 = require("./ims-db");
let c = new ims_db_1.ImsDb();
c.connect('ws://127.0.0.1:6006');
