import { Subject, Teacher } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

//get all subjects
route.get('/', (req, res) => {
    Subject.findAll()
        .then((subjects) => {
            res.status(200).send(subjects)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve subjects"
            })
        })
})

//get subject with id passed in url
route.get('/:id', (req, res) => {
    let subjectId = parseInt(req.params.id)
    Subject.findOne({
        where: {
            id: subjectId
        }
    })
        .then((subject) => {
            res.status(200).send(subject)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve subject of this particular id"
            })
        })

})

//get all those teachers who teaches subject having id passed in url
route.get('/:id/teachers', (req, res) => {
    let subjectId = parseInt(req.params.id)
    Teacher.findAll({
        include: [
            { model: Subject }
        ],
        where: {
            SubjectId: subjectId
        }
    })
        .then((subjectTeachers) => {
            res.status(200).send(subjectTeachers)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve teachers for subject with this particular id"
            })
        })
})

//add new subject
route.post('/', function (req, res) {
    Subject.create({
        subject: req.body.subject,
        CourseId:req.body.courseid
    }).then((subject) => {
        res.status(201).send(subject)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new subject"
        })
    })
})

//update detail of subject with id passed in url
route.put('/:id', function (req, res) {
    Subject.update({ subject: req.body.subject },
        {
            where: {

                id: parseInt(req.params.id)
            }
        })
        .then((subject) => {
            res.status(201).send(subject)
        }).catch((err) => {
            res.status(501).send({
                error: "Could not update subject detail"
            })
        })
})

export default route