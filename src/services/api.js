// No emulador Android, 10.0.2.2 aponta para o localhost da maquina host.
const BASE_URL = "http://10.0.2.2:3000";

export async function buscarJogos() {
  try {
    const response = await fetch(`${BASE_URL}/jogos`)

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: Falha ao buscar jogos`)
    }

    return response.json()

  } catch (e) {
    console.error('buscarJogos:', e.message)
    throw e
  }
}

export async function buscarJogoPorId(id) {
  try {
    const response = await fetch(`${BASE_URL}/jogos/${id}`)

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: jogo não encontrado`)
    }

    return response.json()

  } catch (e) {
    console.error('buscarJogoPorId:', e.message)
    throw e
  }
}

export async function adicionarFavorito(jogoId, observacao) {
  try {
    const response = await fetch(`${BASE_URL}/favoritos`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({jogoId, observacao})
    })

    if(!response.ok){
      const corpo = await response.json().catch(() => ({}))
      const erro = new Error(corpo.erro ?? `Erro ${response.status}: falha ao adicionar favorito`)
      erro.status = response.status
      throw erro
    }
    return response.json()
  } catch (e) {
    console.error("adicionarFavorito:", e.message)
    throw e
  }
}

export async function listarFavoritos() {
  try {
    const response = await fetch(`${BASE_URL}/favoritos`)
    if(!response.ok){
      throw new Error(`Erro: ${response.status}: falha ao listar favorito`)
    }
    return response.json()
  } catch (e) {
    console.error("listarFavoritos", e.message)
    throw e
  }
}

export async function editarFavorito(id, observacao) {
  try {
    const response = await fetch(`${BASE_URL}/favoritos/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({observacao})

    })
    if(!response.ok) {
      const corpo = await response.json().catch(() => ({}))
      const erro = new Error(corpo.erro ?? `Erro ${response.status}: falha ao editar favorito`)
      erro.status = response.status
      throw erro
    }
    return response.json()
  } catch (e) {
    console.error("editarFavorito", e.message)
    throw e
  }
}

export async function removerFavorito(id) {
  try {
    const response = await fetch(`${BASE_URL}/favoritos/${id}`, {
      method: "DELETE"
    })
    if(!response.ok) {
      throw new Error(`Erro ${response.status}: falha ao remover favorito`)
    }
  } catch (e) {
    console.error("removerFavorito:", e.message)
    throw e
  }
}
