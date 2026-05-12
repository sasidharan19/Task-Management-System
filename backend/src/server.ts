import dotenv from "dotenv";
dotenv.config();

import app from "./app";

import { seedAdmin } from "./utils/seedAdmin";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();