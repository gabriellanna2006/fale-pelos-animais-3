import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, email, telefone, endereco, tipo, descricao } = req.body;

  if (!nome || !email || !descricao) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "falepelosanimais@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,  
    },
  });

  try {
    await transporter.sendMail({
      from: "falepelosanimais@gmail.com",
      to: "falepelosanimais@gmail.com",
      subject: `Nova denúncia – ${nome}`,
      text: `
Nome: ${nome}
Email: ${email}
Telefone: ${telefone}
Endereço: ${endereco}
Tipo de maus-tratos: ${tipo}

Descrição:
${descricao}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return res.status(500).json({ error: error.message });
  }
}
