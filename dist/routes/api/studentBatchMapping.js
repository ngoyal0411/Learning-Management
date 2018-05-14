"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.post('/', function (req, res) {
    db_1.BatchStudentMapping.create({
        BatchId: req.body.batchid,
        StudentId: req.body.studentid
    }).then((batchStudent) => {
        res.status(201).send(batchStudent);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not enroll student in batch"
        });
    });
});
route.post('/addBatch', function (req, res) {
    db_1.Batch.create({
        batch: req.body.batch,
        CourseId: req.body.courseid
    }).then((batchStudent) => {
        res.status(201).send(batchStudent);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not enroll student in batch"
        });
    });
});
route.post('/addLecture', function (req, res) {
    db_1.Lecture.create({
        lecture: req.body.lecture,
        BatchId: req.body.batchid,
        TeacherId: req.body.teacherid
    }).then((lecture) => {
        res.status(201).send(lecture);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add lecture"
        });
    });
});
route.get('/', (req, res) => {
    db_1.Batch.findAll().then((batch) => {
        res.status(201).send(batch);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve batch"
        });
    });
});
exports.default = route;
