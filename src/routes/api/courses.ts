import { Course, Batch, Lecture, BatchStudentMapping, Student, Teacher } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'
import Sequelize from 'sequelize'
const Op = Sequelize.Op


route.get('/', (req, res) => {
    Course.findAll().then((courses) => {
        res.status(201).send(courses)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve courses"
        })
    })
})

route.get('/:id', (req, res) => {
    let courseId = parseInt(req.params.id)
    Course.findOne({
        where: {
            id: courseId
        }
    })
        .then((course) => {
            res.status(200).send(course)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve course of this particular id"
            })
        })

})

route.get('/:id/batches', (req, res) => {
    let courseId = parseInt(req.params.id)
    Batch.findAll({
        where: {
            CourseId: courseId
        }
    })
        .then((batches) => {
            res.status(200).send(batches)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve batches related to course with particular id"
            })
        })

})

route.get('/:id/batches/:bid', (req, res) => {
    Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    })
        .then((batch) => {
            res.status(200).send(batch)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve batch"
            })
        })

})

route.get('/:id/batches/:bid/lectures', (req, res) => {

    Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    })
        .then((batch: any) => {
            Lecture.findAll({
                where: {
                    BatchId: batch.id
                }
            })
                .then((lectures) => {
                    res.status(200).send(lectures)
                })
                .catch((err) => {
                    res.status(500).send({
                        error: "Could not retrieve lectures related to batch with particular id"
                    })
                })

        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve batch"
            })
        })

})

route.get('/:id/batches/:bid/lectures/:lid', (req, res) => {

    Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    }).then((batch: any) => {
        Lecture.findOne({
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
                })
            })

    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batch"
        })
    })

})

route.get('/:id/batches/:bid/students', (req, res) => {
    let subjectId = parseInt(req.params.id)
    Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    }).then((batch: any) => {
        BatchStudentMapping.findAll({
            include: [
                {
                    model: Student
                }
            ],
            where: {
                BatchId: parseInt(batch.id)
            }
        }).then((students) => {
            res.status(200).send(students)
        }).catch((err) => {
                res.status(500).send({
                    error: "Could not retrieve students enrolled in this particular batch"
                })
            })
    })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve batch"
            })
        })
})

//get
route.get('/:id/batches/:bid/teachers', (req, res) => {
    Batch.findOne({
        where: {
            [Op.and]: [
                { id: parseInt(req.params.bid) },
                { CourseId: parseInt(req.params.id) }
            ]
        }
    }).then((batch: any) => {
        Lecture.findAll({
            include: [
                { model: Teacher }
            ],
            where: {
                BatchId: batch.id
            }
        }).then((teachers) => {
            res.status(200).send(teachers)
        })
            .catch((err) => {
                res.status(500).send({
                    error: "Could not retrieve teachers of this particular id"
                })
            })

    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batch"
        })
    })
})


//post
route.post('/', function (req, res) {
    Course.create({
        courseName: req.body.name
    }).then((course) => {
        res.status(201).send(course)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new course"
        })
    })
})

export default route