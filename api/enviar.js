export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await fetch("https://vale8chan.app.n8n.cloud/webhook/pdf-agente", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // o JSON
      },
      body: new URLSearchParams(req.body), // o JSON.stringify(req.body)
    });

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
