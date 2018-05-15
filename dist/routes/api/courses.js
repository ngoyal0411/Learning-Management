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
route.get('/', (req, res) => {
    db_1.Course.findAll().then((courses) => {
        res.status(201).send(courses);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve courses"
        });
    });
});
route.get('/:id', (req, res) => {
    let courseId = parseInt(req.params.id);
    db_1.Course.findOne({
        where: {
            id: courseId
        }
    })
        .then((course) => {
        res.status(200).send(course);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve course of this particular id"
        });
    });
});
route.get('/:id/batches', (req, res) => {
    let courseId = parseInt(req.params.id);
    db_1.Batch.findAll({
        include: [{ model: db_1.Course }],
        where: {
            CourseId: courseId
        }
    })
        .then((batches) => {
        res.status(200).send(batches);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course with particular id"
        });
    });
});
route.get('/:id/batches/:bid', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    })
        .then((batch) => {
        res.status(200).send(batch);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batch"
        });
    });
});
route.get('/:id/batches/:bid/lectures', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    })
        .then((batch) => {
        db_1.Lecture.findAll({
            where: {
                BatchId: batch.id
            }
        })
            .then((lectures) => {
            res.status(200).send(lectures);
        })
            .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve lectures related to batch with particular id"
            });
        });
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batch"
        });
    });
});
route.get('/:id/batches/:bid/lectures/:lid', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    }).then((batch) => {
        db_1.Lecture.findOne({
            where: {
                [Op.and]: [
                    { BatchId: batch.id },
                    { id: parseInt(req.params.lid) }
                ]
            }
        }).then((lecture) => {
            res.status(200).send(lecture);
        })
            .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve lectures related to batch with particular id"
            });
        });
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batch"
        });
    });
});
route.get('/:id/batches/:bid/students', (req, res) => {
    let subjectId = parseInt(req.params.id);
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    }).then((batch) => {
        db_1.BatchStudentMapping.findAll({
            include: [
                {
                    model: db_1.Student
                }
            ],
            where: {
                BatchId: parseInt(batch.id)
            }
        }).then((students) => {
            res.status(200).send(students);
        }).catch((err) => {
            res.status(500).send({
                error: "Could not retrieve students enrolled in this particular batch"
            });
        });
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batch"
        });
    });
});
//get
route.get('/:id/batches/:bid/teachers', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    }).then((batch) => {
        db_1.Lecture.findAll({
            include: [
                { model: db_1.Teacher }
            ],
            where: {
                BatchId: batch.id
            }
        }).then((teachers) => {
            res.status(200).send(teachers);
        })
            .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve teachers of this particular id"
            });
        });
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batch"
        });
    });
});
//post
route.post('/', function (req, res) {
    db_1.Course.create({
        courseName: req.body.coursename
    }).then((course) => {
        res.status(201).redirect('/');
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new course"
        });
    });
});
exports.default = route;
