import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat.routes.js';
const app = express();

app.use(express.json());
app.use(express.static('public'))

app.use(cors({
    origin: ["http://localhost:5173", "https://ai-chatbot-3q97.onrender.com", "http://localhost:3000"],
    credentials: true
}))
app.use("/api/chat", chatRouter)

app.get('/', (req, res) => {
    res.send('Hey there!');
})

export default app