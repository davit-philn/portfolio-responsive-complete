const express = require('express')
const nodemailer = require('nodemailer')
const app = express()

app.use(express.json())
app.use(express.static(__dirname))

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })
      await transporter.sendMail({
        from: email,
        to: process.env.SMTP_USER,
        subject: `Contact from ${name}`,
        text: message
      })
    } else {
      console.log('Contact message:', { name, email, message })
    }
    res.json({ status: 'ok' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error sending email' })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
