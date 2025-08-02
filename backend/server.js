import express from "express"; // Importing Express from express Module.
import dotenv from "dotenv"; // Importing ENV File.
import { connectDB } from "./Config/db.js"; // importing Connect db from DB.js.
import cors from "cors"
import UserRoutes from "./routes/data.routs.js"

dotenv.config();

const app = express(); // A variable to store express. is called APP.

app.use(cors({origin:"http://localhost:5173",
    credentials : true
})); // connection frontend and backend

app.use(express.json());

app.use("/api/datas", UserRoutes)


// Connection DB for MongoDB------------------------------------------------------------------------------
app.listen(5000,()=>{
     
     // Calling ConnectinDB to connect with server.
     connectDB();
     
     console.log("Server Started at http://localhost:5000");
})

