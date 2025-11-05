import express from "express";
import routes from "./routes/routes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

dotenv.config()

const app = express();
const PORT = process.env.PORT
const __dirname = path.resolve()



// middleware
app.use(express.json())
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use("/api/notes/", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT);
    });
})

