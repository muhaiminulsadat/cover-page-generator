import nodemailer from "nodemailer";

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const isConfigured = Boolean(user && pass);

export const transporter = isConfigured
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    })
  : null;

export const fromEmail = user || "noreply@coverpagegenerator.com";
