import express from 'express'
import validatePhone from '../utils/validatePhone.js'

const router = express.Router()

// Set conversion rates here (admin-defined)
const conversionRates = {
  ETB: 68,     // Example: 1 GBP = 68 ETB
  UGX: 4700,
  ERN: 20,
  SOS: 720,
  SAR: 4.7
}

router.post('/', (req, res) => {
  const {
    senderName,
    senderPhone,
    recipientName,
    recipientPhone,
    destinationCountry,
    deliveryMethod,
    sendingAmountGBP
  } = req.body

  if (!senderName || !recipientName || !sendingAmountGBP || !destinationCountry) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  if (!validatePhone(senderPhone) || !validatePhone(recipientPhone)) {
    return res.status(400).json({ error: 'Invalid phone number format' })
  }

  const rate = conversionRates[destinationCountry]
  if (!rate) {
    return res.status(400).json({ error: 'Unsupported country' })
  }

  const receivingAmount = sendingAmountGBP * rate

  // In future: save to DB, send email/SMS, etc.
  res.status(200).json({
    message: 'Transfer request received',
    data: {
      recipientName,
      recipientPhone,
      destinationCountry,
      deliveryMethod,
      sendingAmountGBP,
      receivingAmount,
      conversionRate: rate
    }
  })
})

export default router
