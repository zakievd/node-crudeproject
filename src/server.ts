import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth/auth";
import profileRouter from "./routes/profile/profile"

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api",profileRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
