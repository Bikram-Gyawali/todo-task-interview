import express from "express";
import methodOverride from "method-override";
import { todoRoutes } from "./routes/todo.route";
import connectDB from "./config/db";
import dotenv from "dotenv";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.middleware";

const app = express();

// middlweare block
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));
dotenv.config();


connectDB();

// routes for health check
app.get("/", (req, res) => {
    res.send("Server is running. Go to /todos!");
})


// todo routes block
app.use("/todos", todoRoutes);

app.use(errorHandler)
app.use(notFoundHandler);

app.listen(process.env.PORT || 3000, () => console.log(`Server running on http://localhost:${process.env.PORT || 3000}`));
