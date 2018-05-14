import express from 'express'
import path from 'path'
import session from 'express-session'
import apiRoute from './routes/api'
const routes={
    apies:apiRoute
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(path.join(__dirname, 'public')))

 app.use('/api',routes.apies)

app.listen(4444, () => console.log('Running at http://localhost:4444'));