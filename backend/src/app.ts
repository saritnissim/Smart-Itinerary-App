import express from "express";
import { login, register, changePassword } from "./controllers/authController";
import itineraryRouter from "./routes/itineraryRouter";
import cors from "cors";
import destinationRouter from "./routes/destinationRouter";
import bodyParser from "body-parser";

const app = express();

// Middleware to parse incoming JSON
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Middleware to parse Authorization header and verify JWT token
// app.use(authMiddleware);

app.use("/itineraries", itineraryRouter);
app.use("/destinations", destinationRouter);

//Login route to authenticate users and get JWT token
app.post("/login", login);
app.post("/register", register);
app.put("/change-password", changePassword);

export default app;
