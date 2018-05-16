"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
// const db = new Sequelize('learningManagementDB', 'nishugoel', 'password', {
//     dialect: 'mysql',
//     host: 'localhost',
//     pool:{
//         min:0,
//         max:5,
//     }
// })
const db = new sequelize_1.default({
    dialect: 'sqlite',
    host: 'localhost',
    storage: 'learningManagementDB.db',
    pool: {
        min: 0,
        max: 5,
    }
});
exports.Course = db.define('Course', {
    courseName: {
        type: sequelize_1.default.STRING(30),
        allowNull: false,
    }
});
exports.Batch = db.define('Batch', {
    batch: {
        type: sequelize_1.default.STRING(30),
        allowNull: false,
    }
});
exports.Teacher = db.define('Teacher', {
    teacherName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.Student = db.define('Student', {
    studentName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.Lecture = db.define('Lecture', {
    lecture: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.Subject = db.define('Subject', {
    subject: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.BatchStudentMapping = db.define('BatchStudentMapping', {});
exports.Batch.belongsTo(exports.Course);
exports.Subject.belongsTo(exports.Course);
exports.Teacher.belongsTo(exports.Subject);
exports.Lecture.belongsTo(exports.Batch);
exports.Lecture.belongsTo(exports.Teacher);
exports.BatchStudentMapping.belongsTo(exports.Batch);
exports.BatchStudentMapping.belongsTo(exports.Student);
db.sync({ force: false })
    .then(() => { console.log("Database has been synced "); })
    .catch((err) => console.log("Error in Creating database"));
exports.default = db;
