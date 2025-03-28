import express from "express";
import bodyParser from "body-parser";
import queryRoutes from "./routes/queryRoutes";
import { authenticate } from "./middleware/auth";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
// app.use(authenticate); // TODO:

// Routes
app.use("/api", queryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
