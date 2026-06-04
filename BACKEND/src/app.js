import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat.routes.js';
const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use("/api/chat", chatRouter)

app.get('/', (req, res) => {
    res.send('Hey there!');
})

export default app