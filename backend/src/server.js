import express from "express";
import routes from "./routes/routes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express();
const PORT = process.env.PORT



// middleware
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use("/api/notes/", routes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT);
    });
})

