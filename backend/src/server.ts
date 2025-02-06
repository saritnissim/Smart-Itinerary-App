import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.port || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
