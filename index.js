import express from 'express'
import bootstrap from './src/controllers/app.controller.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express()
const port = 3000


app.use(express.json())
app.use(express.static('./src/static'))

bootstrap(app , express) //app.controller.js

app.listen(port, () => console.log(`app listening on port ${port}!`))

