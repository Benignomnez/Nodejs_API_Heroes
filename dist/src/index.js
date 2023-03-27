"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./heroe/routes");
const Villianroutes_1 = require("./villian/Villianroutes");
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/heroe', routes_1.heroeRoute);
app.use('/villian', Villianroutes_1.villianRoute);
app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});
