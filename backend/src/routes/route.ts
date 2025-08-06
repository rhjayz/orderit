import express from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  getUsers,
  verifyAccount,
  forgotPassword,
  resetPassword,
  updatePassword,
  authGoogle,
  authCheckGoogle,
  me,
} from "../controllers/authController";
import {
  index,
  filterCard,
  chartDashboard,
  filterTable,
} from "../controllers/dashboardController";
import authMiddleware from "../middleware/authMiddleware";
const route = express.Router();

//Check API Jalan
route.get("/", (req, res) => {
  res.send("AUTH API Working");
});

// Auth Route
//Public Route
route.post("/register", register);
route.post("/login", login);
route.get("/me", me);
//Auth Google
route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
route.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  authGoogle
);
//End Auth Google
route.get("/verifyAccount/:token", verifyAccount);
route.post("/forgotPassword/", forgotPassword);
route.get("/resetPassword/", resetPassword);
route.post("/updatePassword", updatePassword);
//Protected Route
route.post("/logout", authMiddleware, logout);
//End Auth Route

//Dashboard Route
route.get("/dashboard", authMiddleware, index);
route.get("/filterCard", authMiddleware, filterCard);
route.get("/chartDashboard", authMiddleware, chartDashboard);
route.get("/filterTable", authMiddleware, filterTable);
//End Dashboard Route

route.get("/users", authMiddleware, getUsers);

export default route;
