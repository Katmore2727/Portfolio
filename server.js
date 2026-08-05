/* eslint-env node */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const requestCounts = new Map()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10

app.use(cors({ origin: true }))
app.use(express.json({ limit: '1mb' }))

app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown'
  const now = Date.now()
  const requestLog = requestCounts.get(ip) || []
  const recentRequests = requestLog.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a moment.' })
  }

  recentRequests.push(now)
  requestCounts.set(ip, recentRequests)
  next()
})

function sanitizeInput(value) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.replace(/<[^>]*>/g, '').trim()
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isPlaceholderValue(value) {
  if (typeof value !== 'string') {
    return true
  }

  const normalized = value.trim().toLowerCase()

  return (
    normalized.length === 0 ||
    normalized.includes('your_') ||
    normalized.includes('example.com') ||
    normalized.includes('changeme') ||
    normalized === 'smtp.example.com' ||
    normalized === 'localhost'
  )
}

function hasValidEmailConfig() {
  return !isPlaceholderValue(process.env.SMTP_HOST) &&
    !isPlaceholderValue(process.env.SMTP_USER) &&
    !isPlaceholderValue(process.env.SMTP_PASS)
}

function getMailConfig() {
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim()
  const port = Number((process.env.SMTP_PORT || '587').trim())
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '').trim()
  const from = (process.env.SMTP_FROM || process.env.SMTP_USER || '').trim()
  const to = (process.env.CONTACT_TO || process.env.SMTP_USER || '').trim()

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    from,
    to
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message, website } = req.body || {}

  const sanitizedData = {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    subject: sanitizeInput(subject),
    message: sanitizeInput(message),
    website: sanitizeInput(website)
  }

  if (sanitizedData.website) {
    return res.status(400).json({ error: 'Spam detected.' })
  }

  if (!sanitizedData.name || sanitizedData.name.length < 2) {
    return res.status(400).json({ error: 'Please provide your name.' })
  }

  if (!sanitizedData.email || !isValidEmail(sanitizedData.email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  if (!sanitizedData.subject || sanitizedData.subject.length < 3) {
    return res.status(400).json({ error: 'Please provide a subject.' })
  }

  if (!sanitizedData.message || sanitizedData.message.length < 20) {
    return res.status(400).json({ error: 'Please share a bit more detail so I can respond effectively.' })
  }

  if (!hasValidEmailConfig()) {
    return res.status(503).json({ error: 'Contact delivery is not configured yet. Add valid SMTP credentials to your .env file.' })
  }

  try {
    const mailConfig = getMailConfig()
    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.port === 465,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
      },
      requireTLS: true
    })

    const mailOptions = {
      from: mailConfig.from,
      to: mailConfig.to,
      replyTo: sanitizedData.email,
      subject: `Portfolio inquiry: ${sanitizedData.subject}`,
      text: `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\n\nMessage:\n${sanitizedData.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h3>New portfolio inquiry</h3>
          <p><strong>Name:</strong> ${escapeHtml(sanitizedData.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(sanitizedData.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(sanitizedData.subject)}</p>
          <p><strong>Message:</strong><br />${escapeHtml(sanitizedData.message).replace(/\n/g, '<br />')}</p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Failed to send contact email:', error)

    if (error?.code === 'EAUTH' && /gmail\.com/i.test(process.env.SMTP_HOST || '')) {
      return res.status(503).json({
        error: 'Gmail authentication failed. Please use a Google App Password in SMTP_PASS instead of your normal Gmail password.'
      })
    }

    return res.status(503).json({ error: 'Unable to send your message right now. Please verify the SMTP configuration.' })
  }
})

if (process.env.NETLIFY !== 'true') {
  app.use(express.static(path.join(process.cwd(), 'dist')))

  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
  })

  app.listen(PORT, () => {
    console.log(`Contact server listening on http://localhost:${PORT}`)
  })
}

export default app
