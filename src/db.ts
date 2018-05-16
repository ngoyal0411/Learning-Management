import Sequelize from 'sequelize'

// const db = new Sequelize('learningManagementDB', 'nishugoel', 'password', {
//     dialect: 'mysql',
//     host: 'localhost',
//     pool:{
//         min:0,
//         max:5,
//     }
// })

const db = new Sequelize( {
    dialect: 'sqlite',
    host: 'localhost',
    storage:'learningManagementDB.db',
    pool:{
        min:0,
        max:5,
    }
})



export const Course = db.define('Course', {
    courseName: {
        type: Sequelize.STRING(30),
        allowNull: false,
    }
    
})

export const Batch=db.define('Batch',{
    batch:{
        type: Sequelize.STRING(30),
        allowNull: false,
    }
   
})

export const Teacher=db.define('Teacher',{
    teacherName:{
        type:Sequelize.STRING,
        allowNull: false,
    }
})

export const Student=db.define('Student',{
    studentName:{
        type:Sequelize.STRING,
        allowNull:false,
    }

})

export const Lecture=db.define('Lecture',{
    lecture:{
        type:Sequelize.STRING,
        allowNull:false,
    }

})

export const Subject=db.define('Subject',{
    subject:{
        type:Sequelize.STRING,
        allowNull:false,
    }

})

export const BatchStudentMapping=db.define('BatchStudentMapping',{

})

Batch.belongsTo(Course)
Subject.belongsTo(Course)
Teacher.belongsTo(Subject)
Lecture.belongsTo(Batch)
Lecture.belongsTo(Teacher)
BatchStudentMapping.belongsTo(Batch)
BatchStudentMapping.belongsTo(Student)

db.sync({ force: false })
    .then(()=>{console.log("Database has been synced ")})
    .catch((err)=>console.log("Error in Creating database"))
export default db
