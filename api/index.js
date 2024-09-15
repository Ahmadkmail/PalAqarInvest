import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.rout.js'
dotenv.config()
mongoose.connect(process.env.MONGO).then(() => console.log('connected to mongodb')).catch(err => console.log(err))
const app = express();
app.use(express.json())
app.listen(3000, () => {
    console.log('listening on port 3000')
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter) 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({ statusCode, message });
    next();
});
