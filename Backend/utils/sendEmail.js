import nodemailer from "nodemailer"

// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4e1bca8072c482",
      pass: "dd1e4f8ae54aa0"
    }
  });

export const sendEmail = async (email, name, token, subject, text) => {
    const info = await transporter.sendMail({
        from: '"MyApp👻" <myapp@semillero.com>', // sender address
        to: email, // list of receivers
        subject, // Subject line
        text, // plain text body
        html: emailFormat(name, token), // html body
    });
}

const emailFormat = (name, token) => {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 15);
    const fechaLimiteFormateada = fechaLimite.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
  <style>
  /* Estilos generales */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1,
  p {
    margin: 0;
  }
  /* Estilos específicos */
  .header {
    background-color: cornflowerblue;
    color: white;
    text-align: center;
    padding: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }
  .content {
    padding: 20px 0;
  }
  .name {
    font-weight: bold;
  }
  .btn {
    display: inline-block;
    margin: 15px 0;
    padding: 12px;
    border-radius: 5px;
    background-color: cornflowerblue;
  }  
  .btn a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  .btn:hover{
    cursor: pointer;
    background-color: rgb(82, 118, 185);
  }
  .footer {
    text-align: center;
    padding-top: 20px;
    border-top: 2px solid #ccc;
  }
</style>

<div class="container">
  <div class="header">
    <h1>¡Hola!</h1>
  </div>
  <div class="content">
    <p>
      Hola <span class="name">${name + token}</span>, 
      tu cuenta ha sido creada correctamente.
    </p>

    <br>
    
    <p>Para iniciar sesión debes verificar tu cuenta en el siguiente enlace: </p>
     
    <a class="btn" href="http://localhost:4000/api/v1/users/verify/${token}">Verificar Cuenta</a>

    <br>
    <p style="text-align: center;">Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>    
  </div>

  <br>
  <div class="footer">
    <p>Gracias por utilizar nuestro servicio.</p>
    <p>Cotización Válida hasta el ${fechaLimiteFormateada}</p>
  </div>
</div>

  `;
}