import "dotenv/config"
import express from "express"
import authRoute from "./src/routes/auth.route.js";

const app = express();

app.use(express.json())

app.use("/api/auth", authRoute);

const PORT = 4000

app.listen(PORT, () => {
    console.log("Server running on: http://localhost:4000");
})