"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.get('/', (req, res) => {
    db_1.Batch.findAll({
        include: [
            { model: db_1.Course }
        ],
    }).then((batches) => {
        res.status(201).send(batches);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve batch"
        });
    });
});
route.get('/upcoming', (req, res) => {
    db_1.Batch.findAll({
        include: [
            { model: db_1.Course }
        ],
        limit: 5, order: [['updatedAt', 'DESC']]
    }).then((batches) => {
        res.status(201).send(batches);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve batch"
        });
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve Course"
        });
    });
});
route.post('/', function (req, res) {
    db_1.Course.findOne({
        where: {
            courseName: req.body.coursename
        }
    }).then((course) => {
        db_1.Batch.create({
            batch: req.body.batchname,
            CourseId: course.id
        }).then((batchStudent) => {
            res.status(201).redirect('/');
        }).catch((err) => {
            res.status(501).send({
                error: "Could not enroll student in batch"
            });
        });
    });
});
exports.default = route;
