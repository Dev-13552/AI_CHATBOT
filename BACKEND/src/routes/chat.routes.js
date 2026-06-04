import express from 'express'
import { getResponseController } from '../controllers/chat.controller.js'

const router = express.Router()

router.post('/', getResponseController)

export default router