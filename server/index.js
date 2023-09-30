import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://ravalbit-ai-art-server.onrender.com/', // Replace with your React app's domain
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello form DALL-E!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log(
        "The serevr has started on port 8080"
      );
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
