import "dotenv/config"
import express from "express"
import authRoute from "./src/routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); 

app.use("/api/auth", authRoute);

const PORT = 4000

app.listen(PORT, () => {
    console.log("Server running on: http://localhost:4000");
})