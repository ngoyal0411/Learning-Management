"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
route.post('/', function (req, res) {
    db_1.Batch.findOne({
        where: {
            id: parseInt(req.body.batchId)
        }
    }).then((batch) => {
        db_1.BatchStudentMapping.findAll({
            where: {
                [Op.and]: [
                    { StudentId: parseInt(req.body.studentId) },
                    { BatchId: batch.id }
                ]
            }
        }).then((mapping) => {
            if (mapping.length == 0) {
                db_1.BatchStudentMapping.create({
                    StudentId: parseInt(req.body.studentId),
                    BatchId: batch.id
                }).then((studentbatchmapping) => {
                    res.status(201).send();
                }).catch((err) => {
                    res.status(501).send({
                        error: "Could not Enroll student to batch"
                    });
                });
            }
            else {
                res.status(202).send();
            }
        });
    });
});
route.post('/map', function (req, res) {
    db_1.BatchStudentMapping.findAll({
        where: {
            [Op.and]: [
                { StudentId: req.body.studentId },
                { BatchId: req.body.batchId }
            ]
        }
    }).then((mapping) => {
        if (mapping.length == 0) {
            db_1.BatchStudentMapping.create({
                StudentId: req.body.studentId,
                BatchId: req.body.batchId
            }).then((studentbatchmapping) => {
                res.status(201).send();
            }).catch((err) => {
                res.status(501).send({
                    error: "Could not Enroll student to batch"
                });
            });
        }
        else {
            res.status(202).send();
        }
    });
});
route.get('/', (req, res) => {
    db_1.BatchStudentMapping.findAll().then((batchstudent) => {
        res.status(201).send(batchstudent);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve batch"
        });
    });
});
exports.default = route;
