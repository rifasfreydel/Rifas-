import { useEffect, useState } from "react";

export default function Admin() {
  const [compras, setCompras] = useState([]);

  const fetchCompras = async () => {
    const res = await fetch("/api/aprobar");
    const data = await res.json();
    setCompras(data);
  };

  const aprobar = async (id) => {
    await fetch("/api/aprobar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCompras();
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Panel Admin</h1>
      {compras.map((c) => (
        <div key={c.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p>{c.nombre} - {c.boletos} boletos</p>
          <p>Total: {c.total} Bs</p>
          <p>Aprobado: {c.aprobado ? "✅" : "❌"}</p>
          {!c.aprobado && <button onClick={() => aprobar(c.id)}>Aprobar</button>}
        </div>
      ))}
    </div>
  );
}
