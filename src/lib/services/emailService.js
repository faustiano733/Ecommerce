import nodemailer from 'nodemailer'



export async function enviarEmail(email_cliente, html){
    
    //const Html = <Facturas />
    //const emailHTML = renderToStaticMarkup(Html)

    // Criar um objeto transportador
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // usar SSL
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_KEY,
    }
    });

    // Configurar o objeto mailoptions
    const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email_cliente,
    subject: 'Enviando Email usando Node.js',
    html: html
    };

    // Enviar o email
    transporter.sendMail(mailOptions)
}