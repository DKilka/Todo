import express from "express";
import connectToMongoDB from "./mongoDb.js";
import todoRoutes from "./routes.js";

const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todo", todoRoutes);

connectToMongoDB();

app.get("/", (req, res) => {
  res.send({ message: "ExpressJS" });
});

app.listen(PORT, () => console.log("Server is working..."));
