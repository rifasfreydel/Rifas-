import { useState } from "react";

export default function Home() {
  const [boletos, setBoletos] = useState(2);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    cedula: "",
    comprobante: null,
  });

  const precio = 15;
  const total = boletos * precio;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, comprobante: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    data.append("boletos", boletos);

    await fetch("/api/comprar", {
      method: "POST",
      body: data,
    });

    alert("Compra enviada, espera confirmación.");
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <header style={{ textAlign: "center" }}>
        <img src="/logo.png" alt="logo" width={80} />
      </header>

      <main style={{ textAlign: "center" }}>
        <img src="/flayer.png" alt="flayer" width="100%" />

        <h1>Participa en la Rifa</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            onChange={handleChange}
            required
          />
          <br />

          <label>Boletos: </label>
          <select value={boletos} onChange={(e) => setBoletos(+e.target.value)}>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          <p>Total: {total} Bs</p>

          <label>Subir comprobante:</label>
          <input type="file" onChange={handleFile} required />
          <br />

          <button type="submit">Comprar</button>
        </form>
      </main>

      <footer style={{ textAlign: "center", marginTop: 20 }}>
        <p>Síguenos en Instagram: @freydel</p>
        <p>© 2025 Freydel Rifas - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
