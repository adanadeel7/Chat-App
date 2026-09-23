import express from "express" 
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes"
dotenv.config()

const app = express()
const port = process.env.PORT


app.use(cors({
    origin : process.env.APP_URL,
    credentials : true
}))

app.use(express.json)
app.use(cookieParser())


app.get('/health', (req,res)=> { 
     res.json({status : 'ok'})
})

app.use('/auth',authRouter)

app.listen(port, ()=> { 
    console.log(`Server is successfully running on ${port}`)
})
