import express from 'express'
import postStk from '../controllers/stkPush.js'
import routeTest from '../controllers/test.js'

const router = express.Router()

router.get('/test',routeTest)
router.post('/stkpush', postStk)

export default router;

