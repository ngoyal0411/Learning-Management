"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.post('/', function (req, res) {
    db_1.Batch.findOne({
        where: {
            batch: req.body.batchname
        }
    }).then((batch) => {
        db_1.Lecture.create({
            lecture: req.body.name,
            BatchId: batch.id,
            TeacherId: req.body.teachername.id
        }).then((lecture) => {
            res.status(201).redirect('/');
        }).catch((err) => {
            console.log(err);
            res.status(501).send({
                error: "Could not add lecture"
            });
        });
    }).catch((err) => {
        res.status(501).send({
            error: "Could not find any batch of this name"
        });
    });
});
exports.default = route;
