import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'

// Routes
import projectRoutes from './routes/project.routes'
import taskRoutes from './routes/task.routes'
import searchRoutes from './routes/search.routes'
import teamRoutes from './routes/team.routes'
import userRoutes from './routes/user.routes'

dotenv.config()

const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

// routes
app.get("/",(req,res) => {
    res.send("This is home route")
})
app.use("/api/v1/projects",projectRoutes)
app.use("/api/v1/tasks",taskRoutes)
app.use("/api/v1/search",searchRoutes)
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/teams",teamRoutes)

const port = process.env.PORT || 4000;

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})