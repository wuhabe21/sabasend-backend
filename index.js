import express from 'express'
import dotenv from 'dotenv'
import sendRouter from './routes/send.js'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/send', sendRouter)

app.get('/', (req, res) => {
  res.send('SabaSend backend is running!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
