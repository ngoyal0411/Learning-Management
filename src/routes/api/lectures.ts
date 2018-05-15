import { Batch,Lecture } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

route.post('/', function (req, res) {
    Batch.findOne({
        where:{
            batch:req.body.batchname
        }
    }).then((batch:any)=>{
        Lecture.create({
            lecture: req.body.name,
            BatchId:batch.id,
            TeacherId:req.body.teachername.id
        }).then((lecture) => {
            res.status(201).redirect('/');
        }).catch((err) => {
            console.log(err)
            res.status(501).send({
                error: "Could not add lecture"
            })
        })
    }).catch((err)=>{
        res.status(501).send({
            error: "Could not find any batch of this name"
        })
    })
    
})

export default route;