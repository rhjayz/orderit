import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import route from "./routes/route";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import "./config/passport";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("GOOGLE_CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL);

app.use("/api", route);

console.log("NODE_ENV", process.env.NODE_ENV);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
