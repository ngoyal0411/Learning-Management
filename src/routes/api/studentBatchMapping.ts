import { BatchStudentMapping,Batch, Lecture } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'


route.post('/', function (req, res) {
    BatchStudentMapping.create({
        BatchId: req.body.batchid,
        StudentId:req.body.studentid
    }).then((batchStudent) => {
        res.status(201).send(batchStudent)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not enroll student in batch"
        })
    })
})

route.post('/addBatch', function (req, res) {
    Batch.create({
        batch: req.body.batch,
        CourseId:req.body.courseid
    }).then((batchStudent) => {
        res.status(201).send(batchStudent)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not enroll student in batch"
        })
    })
})


route.post('/addLecture', function (req, res) {
    Lecture.create({
        lecture:req.body.lecture,
        BatchId: req.body.batchid,
        TeacherId:req.body.teacherid
    }).then((lecture) => {
        res.status(201).send(lecture)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add lecture"
        })
    })
})

route.get('/',(req,res)=>{
    Batch.findAll().then((batch) => {
        res.status(201).send(batch)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retrieve batch"
        })
    })
})



export default route