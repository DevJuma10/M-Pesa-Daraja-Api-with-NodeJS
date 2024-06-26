import express from 'express'
import postStk from '../controllers/stkPush.js'
import stkPushQuery from '../controllers/stkpushQuery.js'
import dynamicQR from '../controllers/dynamicQR.js'
import routeTest from '../controllers/test.js'
import business2customer from '../controllers/business2customer.js'
import checkTransactionStatus from '../controllers/transactionStatus.js'
import checkBalance from '../controllers/checkBalance.js'
import reverseTransaction from '../controllers/reverseTransaction.js'


const router = express.Router()

router.get('/test',routeTest)
router.post('/stkpush', postStk)
router.post('/stkpushquery', stkPushQuery)
router.post('/dynamicQR', dynamicQR)
router.post('/b2c', business2customer)
router.post('/checkTransactionStatus', checkTransactionStatus)
router.post('check-balance', checkBalance)
router.post('reverse-transaction', reverseTransaction)

export default router;

