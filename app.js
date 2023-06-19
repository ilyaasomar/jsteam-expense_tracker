import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import transaction from "./routes/transaction-routes.js";
import user from "./routes/user-routes.js";
import account from "./routes/account-routes.js";
import general from "./routes/general-routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/transaction", transaction);
app.use("/api/user", user);
app.use("/api/account", account);
app.use("/api/general", general);

mongoose
  .connect(
    "mongodb+srv://liban:112358@cluster0.hermy71.mongodb.net/Finance_db?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(5000, () =>
      console.log(`Server listening on http://localhost:${5000}`)
    )
  )
  .then(() => console.log("The database is connected!"))
  .catch((err) => console.log(err));
