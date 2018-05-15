import { BatchStudentMapping, Batch, Lecture, Course } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

route.get('/', (req, res) => {
    Batch.findAll({
        include: [
            { model: Course }
        ],
    }).then((batches) => {
        res.status(201).send(batches)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve batch"
        })
    })
})

route.get('/upcoming', (req, res) => {
    Batch.findAll({
        include: [
            { model: Course }
        ],
        limit: 5, order: [['updatedAt', 'DESC']]
    }).then((batches) => {
        res.status(201).send(batches)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve batch"
        })
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve Course"
        })
    })
})


route.post('/', function (req, res) {
    Course.findOne({
        where: {
            courseName: req.body.coursename
        }
    }).then((course: any) => {
        Batch.create({
            batch: req.body.batchname,
            CourseId: course.id
        }).then((batchStudent) => {
            res.status(201).redirect('/')
        }).catch((err) => {
            res.status(501).send({
                error: "Could not enroll student in batch"
            })
        })
    })
})
export default route