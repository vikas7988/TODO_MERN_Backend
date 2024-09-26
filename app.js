import express from 'express';
import connectDatabase from "./database/connection/connectDatabase.js"
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import cors from "cors"


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use(errorMiddleware);

connectDatabase().then(()=>{
    app.listen(3035 , ()=>{
        console.log("server is running")
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
