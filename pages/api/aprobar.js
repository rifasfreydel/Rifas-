import prisma from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const compras = await prisma.compra.findMany();
    res.json(compras);
  }

  if (req.method === "POST") {
    const { id } = req.body;
    await prisma.compra.update({
      where: { id },
      data: { aprobado: true },
    });
    res.json({ ok: true });
  }
}
