import express from 'express'
import postStk from '../controllers/stkPush.js'
import stkPushQuery from '../controllers/stkpushQuery.js'
import dynamicQR from '../controllers/dynamicQR.js'
import routeTest from '../controllers/test.js'
import business2customer from '../controllers/business2customer.js'


const router = express.Router()

router.get('/test',routeTest)
router.post('/stkpush', postStk)
router.post('/stkpushquery', stkPushQuery)
router.post('/dynamicQR', dynamicQR)
router.post('/b2c', business2customer)

export default router;

