import prisma from "../../lib/db";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Error al procesar" });

      const compra = await prisma.compra.create({
        data: {
          nombre: fields.nombre,
          telefono: fields.telefono,
          correo: fields.correo,
          cedula: fields.cedula,
          boletos: parseInt(fields.boletos),
          total: parseInt(fields.boletos) * 15,
          comprobante: files.comprobante.originalFilename,
        },
      });

      res.json(compra);
    });
  } else {
    res.status(405).end();
  }
}
