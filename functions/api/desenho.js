
import { gerarDesenho, numeroValido } from "../../lib/desenho.js";

export async function onRequest(context) {
  const request = context.request;

  // 1. Primeiro verifica o método.
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Allow": "POST"
      }
    });
  }

  // 2. Depois verifica o corpo da requisição.
  let dados;

  try {
    dados = await request.json();
  } catch {
    return new Response("Bad Request", {
      status: 400
    });
  }

  if (
    dados === null ||
    typeof dados !== "object" ||
    !numeroValido(dados.numero)
  ) {
    return new Response("Bad Request", {
      status: 400
    });
  }

  // 3. Depois verifica o token.
  const authorization = request.headers.get("Authorization");

  if (
    !authorization ||
    !authorization.startsWith("Bearer ")
  ) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  try {
    const url =
      "https://oauth2.googleapis.com/tokeninfo?id_token=" +
      encodeURIComponent(token);

    const respostaGoogle = await fetch(url);

    if (!respostaGoogle.ok) {
      return new Response("Unauthorized", {
        status: 401
      });
    }

    const info = await respostaGoogle.json();

    if (
      info.aud !== context.env.GOOGLE_CLIENT_ID ||
      info.email_verified !== "true" ||
      !info.email
    ) {
      return new Response("Unauthorized", {
        status: 401
      });
    }

    // O e-mail usado na assinatura vem exclusivamente do token Google.
    const svg = gerarDesenho(dados.numero, info.email);

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml"
      }
    });

  } catch {
    return new Response("Unauthorized", {
      status: 401
    });
  }
}
