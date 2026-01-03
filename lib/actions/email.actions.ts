"use server";

import nodemailer from 'nodemailer';

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
} = process.env;

export const sendEmail = async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: EMAIL_HOST || 'smtp.gmail.com',
            port: Number(EMAIL_PORT) || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"Wealthwave Support" <${EMAIL_USER}>`, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}