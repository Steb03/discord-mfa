import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "postgresql://postgres:password@postgres.railway.internal:5432/railway",
    },
  },
})

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/verify", async (req, res) => {
  const { code } = req.body
  try {
    await prisma.verificationCode.create({
      data: {
        code,
        status: "PENDING",
      },
    })
    res.json({ success: true })
  } catch (error) {
    console.error("Error saving verification code:", error)
    res.status(500).json({ error: "Failed to save verification code" })
  }
})

app.get("/api/codes", async (req, res) => {
  try {
    const codes = await prisma.verificationCode.findMany({
      orderBy: { createdAt: "desc" },
    })
    res.json(codes)
  } catch (error) {
    console.error("Error fetching codes:", error)
    res.status(500).json({ error: "Failed to fetch codes" })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

