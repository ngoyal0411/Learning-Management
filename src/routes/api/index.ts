import express from 'express'
 import courses from './courses'
 import students from './students'
 import subjects from './subjects'
 import teachers from './teachers'
 import batches from './batches'
 import studentsBatchesMapping from './studentBatchMapping'
const route=express.Router()

 route.use('/courses',courses)
 route.use('/students',students)
 route.use('/subjects',subjects)
 route.use('/teachers',teachers)
 route.use('/batches',batches)
 route.use('/studentsBatchesMapping',studentsBatchesMapping)

export default route
