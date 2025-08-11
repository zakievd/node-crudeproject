import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth/auth";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
