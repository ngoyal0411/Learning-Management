"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_1 = __importDefault(require("./courses"));
const students_1 = __importDefault(require("./students"));
const subjects_1 = __importDefault(require("./subjects"));
const teachers_1 = __importDefault(require("./teachers"));
const studentBatchMapping_1 = __importDefault(require("./studentBatchMapping"));
const route = express_1.default.Router();
route.use('/courses', courses_1.default);
route.use('/students', students_1.default);
route.use('/subjects', subjects_1.default);
route.use('/teachers', teachers_1.default);
route.use('/studentsBatchesMapping', studentBatchMapping_1.default);
exports.default = route;
