"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
//get all students
route.get('/', (req, res) => {
    // BatchStudentMapping.findAll({
    //     include: [
    //         {
    //             model: Batch,
    //             include: [Course]
    //         },
    //         {
    //             model: Student
    //         }
    //     ]
    // })
    db_1.Student.findAll()
        .then((students) => {
        res.status(200).send(students);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve students"
        });
    });
});
//get student with id passed in url
route.get('/:id', (req, res) => {
    let studentId = parseInt(req.params.id);
    db_1.Student.findOne({
        where: {
            id: studentId
        }
    })
        .then((student) => {
        res.status(200).send(student);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve students of this particular id"
        });
    });
});
//get all batches of student with id passed in url
route.get('/:id/batches', (req, res) => {
    let studentId = parseInt(req.params.id);
    db_1.BatchStudentMapping.findAll({
        include: [
            { model: db_1.Batch }
        ],
        where: {
            StudentId: studentId
        }
    })
        .then((studentBatches) => {
        res.status(200).send(studentBatches);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches of student with this particular id"
        });
    });
});
//add new student
route.post('/', function (req, res) {
    db_1.Student.create({
        studentName: req.body.studentname,
    }).then((student) => {
        res.status(201).send(student);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new student"
        });
    });
});
//update detail of student with id passed in url
route.put('/:id', function (req, res) {
    db_1.Student.update({ studentName: req.body.name }, {
        where: {
            id: parseInt(req.params.id)
        }
    })
        .then((student) => {
        res.status(201).send(student);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not update student detail"
        });
    });
});
exports.default = route;
