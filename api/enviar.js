export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se permite POST' });
  }

  // Extraer datos del formulario (x-www-form-urlencoded)
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const bodyRaw = Buffer.concat(buffers).toString();
  const params = new URLSearchParams(bodyRaw);
  const frase = params.get("frase");
  const opcion = params.get("opcion");

  // Validar campos
  if (!frase || !opcion) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  try {
    // Reenviar la petición al webhook de n8n
    const respuesta = await fetch("https://vale8chan.app.n8n.cloud/webhook/pdf-agente", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ frase, opcion })
    });

    const data = await respuesta.json();

    // Devolver respuesta al navegador
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al enviar a n8n:", error);
    res.status(500).json({ error: "Error al contactar con n8n" });
  }
}
