
import nodemailer from 'nodemailer';

const SendEmail = async (email: string, name: string): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_SMTP!,
                pass: process.env.PASS_SMTP!,
            },
        });

        const payload = {
            from: process.env.EMAIL_SMTP!,
            to: email,
            subject: 'Create User Success',
            text: `Congratulations ${name}, your account has been successfully created`,
        };

        const info = await transporter.sendMail(payload);
        console.log(info);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export { SendEmail };
