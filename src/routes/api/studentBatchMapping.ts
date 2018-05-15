import { BatchStudentMapping,Batch, Lecture } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'
import Sequelise from 'sequelize'
const Op=Sequelise.Op

route.post('/', function (req, res) {
    Batch.findOne({
        where:{
            batch:req.body.batchname
        }
    }).then((batch:any)=>{
        BatchStudentMapping.findAll({
            where:{
                [Op.and]:[
                    {StudentId: parseInt(req.body.id)},
                    {BatchId:batch.id}
                ]
            }
        }).then((mapping)=>{
            if(mapping.length==0){
                BatchStudentMapping.create({
                    StudentId: parseInt(req.body.id),
                    BatchId:batch.id
                }).then((studentbatchmapping) => {
                    res.status(201).redirect('/')
                }).catch((err) => {
                    res.status(501).send({
                        error: "Could not Enroll student to batch"
                    })
                })
            }
            else{
                res.status(201).redirect('/')
            }
        })
    })  
})


route.post('/map', function (req, res) {
    BatchStudentMapping.findAll({
        where:{
            [Op.and]:[
                {StudentId: req.body.studentId},
                {BatchId:req.body.batchId}
            ]
        }
    }).then((mapping)=>{
        if(mapping.length==0){
            BatchStudentMapping.create({
                StudentId: req.body.studentId,
                BatchId:req.body.batchId
            }).then((studentbatchmapping) => {
                res.status(201).send()
            }).catch((err) => {
                res.status(501).send({
                    error: "Could not Enroll student to batch"
                })
            })
        }
        else{
            res.status(202).send()
        }
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