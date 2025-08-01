import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import nodemailer from "nodemailer";
import crypto from "crypto";

interface registerData {
  name: string;
  email: string;
  password: string;
}

interface loginData {
  email: string;
  password: string;
}

interface forgotData {
  email: string;
}

interface updatePassword {
  password: string;
  cfpassword: string;
  token: string;
}

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export const sendVerification = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const link = `${process.env.BASE_URL}/api/verifyAccount/${token}`;
  await transporter.sendMail({
    from: `"Orderit" <orderit@gmail.com>`,
    to: email,
    replyTo: process.env.EMAIL_USER,
    subject: "Complete Your Registration",
    html: `
            <p>Hello,</p>
            <p>Thank you for signing up! Click the button below to confirm your email:</p>
            <a href="${link}" style="display: inline-block; padding: 10px 20px; background: #cc8d08; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>If you didn't request this, you can ignore this email.</p>
            <p>Best Regards, <br> Orderit Team</p>`,
  });
};

export const verifyAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const reqToken = req.params.token as string;

    if (!reqToken) {
      res.status(400).json({ message: "Token is Required" });
      return;
    }

    if (!process.env.SECRET_KEY) {
      res.status(500).json({ message: "SECRET KEY is Required" });
      return;
    }

    const decoded = jwt.verify(reqToken, process.env.SECRET_KEY) as {
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      res.status(400).json({ message: "Account Invalid" });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: "User Already Verified" });
      return;
    }

    const state = await prisma.user.update({
      where: { email: user.email },
      data: { isVerified: true },
    });

    const token = jwt.sign(
      {
        id: state.id,
        name: state.name,
        email: state.email,
        verified: state.isVerified,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    return;
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body as forgotData;
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 1);

    if (!email) {
      res.status(400).json({ message: "Please fill in the required field." });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      res.status(400).json({ message: "Email doesn't Exist" });
      return;
    }

    const state = await prisma.passwordReset.upsert({
      where: { userEmail: email },
      update: { token: hashedToken, createdAt: expiresAt },
      create: { userEmail: email, token: hashedToken },
    });

    const logoUrl = `${process.env.FRONTEND_URL}/logo.png`;
    const link = `${process.env.BASE_URL}/api/resetPassword?token=${hashedToken}`;
    await transporter.sendMail({
      from: `"Orderit" <orderit@gmail.com>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: "Reset Your Password",
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${logoUrl}" alt="Orderit Logo" style="width: 50px; height: 50px;">
            </div>
            <h2 style="text-align: center; color: #333;">Reset Password Request</h2>
            <p>We received a request to reset your password. No worries—just click the button below to set up a new one:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${link}" style="display: inline-block; padding: 10px 20px; background: #cc8d08; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
            </div>
            <p style="text-align: center; margin: 20px 0;>If the button doesn’t work, try this link instead:</p>
            <p style="text-align: center; margin: 20px 0;><a href="${link}" style="color: #337ab7;">${link}</a></p>
            <p>For security reasons, this link will expire in 1 minutes. If you didn’t request this, you can safely ignore this email. Your account remains secure.</p>
            <p>Need help? Feel free to <a href="https://your-contact-url.com" style="color: #337ab7;">contact us</a>.</p>
            <p>Stay Secure,<br>Orderit Team</p>
        </div>`,
    });
    res
      .status(200)
      .json({ message: "A password reset link has been sent to your email." });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const paramsToken = req.query.token as string;

    if (!paramsToken) {
      res.status(400).json({ message: "Token is required" });
      return;
    }

    const resetData = await prisma.passwordReset.findUnique({
      where: { token: paramsToken },
    });

    console.log("gasss", paramsToken);

    if (!resetData) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/forgotpassword?error=Token invalid`
      );
    }

    if (!resetData || resetData.createdAt < new Date()) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/forgotpassword?error=Token expired`
      );
    }

    res.redirect(
      `${process.env.FRONTEND_URL}/newpassword?token=${paramsToken}`
    );
  }
);

export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { password, cfpassword, token } = req.body as updatePassword;

    if (!password || !cfpassword) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    if (password !== cfpassword) {
      res
        .status(400)
        .json({ message: "Password and Confirm password don't match" });
      return;
    }

    const where = await prisma.passwordReset.findUnique({
      where: { token: token },
    });

    if (!where) {
      res
        .status(400)
        .json({ message: "You don't have link to change ur password" });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const state = await prisma.user.update({
      where: { email: where.userEmail },
      data: { password: hashedPassword },
    });

    const destroy = await prisma.passwordReset.delete({
      where: { userEmail: where.userEmail },
    });

    res.status(200).json({ message: "Success, ur password have changed" });
  }
);

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as registerData;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please fill in the required field." });
    return;
  }

  const check = await prisma.user.findUnique({
    where: { email: email },
  });
  if (check) {
    res.status(400).json({ message: "Email has already been used." });
    return;
  }
  if (!process.env.SECRET_KEY) {
    res
      .status(500)
      .json({ message: "Server misconfiguration: SECRET_KEY not set." });
    return;
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const secretToken = jwt.sign({ email }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  const state = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      secretToken,
      isVerified: false,
    },
  });

  await sendVerification(email, secretToken);
  res
    .status(201)
    .json({ message: "Success! Please check your email for verification." });
});

export const authGoogle = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as any;
  const email = user.email;
  const name = user.displayName;
  const secretToken = jwt.sign({ email }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });

  let state = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (state) {
    state = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (state) {
      const state = await prisma.user.update({
        where: { email: user.email },
        data: { googleID: user.id },
      });
    } else {
      state = await prisma.user.create({
        data: {
          name: name,
          email: email,
          googleID: user.id,
          password: null,
          secretToken,
          isVerified: true,
        },
      });
    }
  }

  const token = jwt.sign(
    {
      id: state.id,
      name: state.name,
      email: state.email,
      verified: state.isVerified,
      photo: state.photo,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

export const authCheckGoogle = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "User Not Authenticated" });
      return;
    }

    const state = jwt.verify(token, process.env.JWT_SECRET!);
    res.json(state);
  }
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as loginData;

  if (!email || !password) {
    res.status(400).json({ message: "Please fill in the required field." });
    return;
  }

  const users = await prisma.user.findUnique({
    where: { email },
  });

  if (!users) {
    res.status(400).json({ message: "Email does not exist" });
    return;
  }

  // if(users.isVerified )
  const isMatch = await bcryptjs.compare(password, users.password);

  if (!isMatch) {
    res.status(400).json({ message: "Password doesn't match" });
    return;
  }

  if (!process.env.SECRET_KEY) {
    res
      .status(500)
      .json({ message: "Server misconfiguration: SECRET_KEY not set." });
    return;
  }

  const token = jwt.sign(
    {
      id: users.id,
      name: users.name,
      email: users.email,
      verified: users.isVerified,
      photo: users.photo,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res
    .status(200)
    .json({ message: `Login Success, welcome ${users.name}`, token });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.clearCookie("connect.sid", { path: "/" }); // Hapus session cookie
  res.status(200).json({ message: "Logout successful" });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unathorized" });
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).json({ user: decode, token: token });
    return;
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
});
