import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Example POST endpoint
app.post("/api/send", async (req, res) => {
  try {
    const data = req.body;

    const result = await prisma.transfer.create({
      data: {
        senderName: data.senderName,
        senderPhone: data.senderPhone,
        senderCountry: data.senderCountry,
        recipientName: data.recipientName,
        recipientPhone: data.recipientPhone,
        recipientCountry: data.recipientCountry,
        amount: parseFloat(data.amount),
        currency: data.currency,
        deliveryMethod: data.deliveryMethod,
        paymentMethod: data.paymentMethod,
        notes: data.notes,
      },
    });

    res.status(200).json({ message: "Transfer created", transfer: result });
  } catch (error) {
    console.error("Error creating transfer:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 🔥 Use Render's provided PORT or fallback to 10000 locally
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`SabaSend backend listening on port ${PORT}`);
});
