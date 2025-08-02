import express from "express"
import { verifyToken } from "../Middleware/verifyToken.js";
import { createData , getData , deleteData , updateData , login } from "../controllers/data.controllers.js";

const router = express.Router();

// API fro creating ----- New User -------------------------------
router.post("/newuser", createData );

// API for Getting the data---------------------------------------
router.get("/profileuser" , verifyToken , getData);

//API fro Delete method-------------------------------------------
router.delete("/delete", verifyToken , deleteData);

// API for Update user--------------------------------------------
router.patch("/:id", updateData );


// API for  Login the user----------------------------------------
router.post("/login" , login)


export default router