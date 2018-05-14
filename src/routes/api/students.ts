import { Student, Batch, BatchStudentMapping } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

//get all students
route.get('/', (req, res) => {
    Student.findAll()
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve students"
            })
        })
})

//get student with id passed in url
route.get('/:id', (req, res) => {
    let studentId = parseInt(req.params.id)
    Student.findOne({
        where: {
            id: studentId
        }
    })
        .then((student) => {
            res.status(200).send(student)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve students of this particular id"
            })
        })

})

//get all batches of student with id passed in url
route.get('/:id/batches', (req, res) => {
    let studentId = parseInt(req.params.id)
    BatchStudentMapping.findAll({
        include: [
            { model: Batch }
        ],
        where: {
            StudentId: studentId
        }
    })
        .then((studentBatches) => {
            res.status(200).send(studentBatches)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve batches of student with this particular id"
            })
        })
})

//add new student
route.post('/', function (req, res) {
    Student.create({
        studentName: req.body.name,
    }).then((student) => {
        res.status(201).send(student)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new student"
        })
    })
})

//update detail of student with id passed in url
route.put('/:id', function (req, res) {
    Student.update({ studentName: req.body.name },
        {
            where: {

                id: parseInt(req.params.id)
            }
        })
        .then((student) => {
            res.status(201).send(student)
        }).catch((err) => {
            res.status(501).send({
                error: "Could not update student detail"
            })
        })
})

export default route