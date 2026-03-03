let token = ""; // vazio na primeira vez

async function enviarComToken() {
  const resposta = await fetch("http://10.11.33.21:5000/dados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });

  const texto = await resposta.text();
  console.log("Resposta bruta:", texto);

  const dados = JSON.parse(texto);

  if (resposta.status === 401) {
    console.log("Token inválido, enviando login e senha...");
    await enviarLoginSenha();
  } else {
    console.log("Servidor:", dados.msg);
  }
}

async function enviarLoginSenha() {
  const resposta = await fetch("http://10.11.33.21:5000/dados", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      login: "cliente1",
      senha: "123"
    })
  });

  const texto = await resposta.text();
  console.log("Resposta bruta:", texto);

  const dados = JSON.parse(texto);
  token = dados.token;

  console.log("Novo token recebido:", token);
}

enviarComToken();