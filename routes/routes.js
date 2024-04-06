import express from 'express'
import postStk from '../controllers/stkPush.js'


const router = express.Router()

router.post('/stkpush', postStk)

