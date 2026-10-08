import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useTema } from '../context/ThemeContext';
import { buscarJogoPorId, adicionarFavorito } from '../services/api';

export default function DetalheJogo({ route }) {
  const { jogoId } = route.params;
  const { cores } = useTema();

  const [jogo, setJogo] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const [adicionando, setAdicionando] = useState(false);
  const [jaFavoritado, setJaFavoritado] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true)
    setErro(null)
    try {
      const dados = await buscarJogoPorId(jogoId)
      setJogo(dados)
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }, [jogoId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function handleAdicionarFavorito() {
    setAdicionando(true)
    setFeedback(null)
    try {
      await adicionarFavorito(jogo.id, "")
      setJaFavoritado(true)
      setFeedback({tipo: "sucesso", texto: "Adicionado aos favoritos"})
    } catch (e) {
      if(e.status === 409){
        setJaFavoritado(true)
        setFeedback({
          tipo: "sucesso",
          texto: "Esse jogo ja esta nos seus favoritos"
        })
      } else {
        setFeedback({ tipo: "erro", texto: e.message })
      }
    } finally {
      setAdicionando(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  if (carregando) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <ActivityIndicator size="large" color={cores.primary} />
        <Text style={[styles.texto, { color: cores.textSecondary }]}>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.texto, { color: cores.error }]}>Erro: {erro}</Text>
        <TouchableOpacity style={[styles.botao, { backgroundColor: cores.primary }]} onPress={carregar}>
          <Text style={{ color: cores.primaryText, fontWeight: '600' }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!jogo) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.texto, { color: cores.textSecondary, textAlign: 'center' }]}>
          Jogo nao encontrado.
        </Text>
      </View>
    );
  }

  const corFeedback = feedback?.tipo === 'sucesso' ? cores.success : cores.error;
  const preco = jogo.preco.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Image source={{ uri: jogo.capa }} style={styles.capa} resizeMode="cover" />
        <View style={styles.sombraHero} />
      </View>

      <View style={styles.conteudo}>
        <View style={styles.cartaoJogo}>
          <View style={styles.linhaMeta}>
            <Text style={styles.meta}>{jogo.empresa} · {jogo.genero}</Text>
          </View>
          <Text style={styles.titulo}>{jogo.titulo}</Text>
          <View style={styles.divisor} />
          <View style={styles.linhaPreco}>
            <Text style={styles.labelPreco}>PREÇO OFICIAL</Text>
            <Text style={styles.preco}>R$ {preco}</Text>
          </View>
        </View>

        <View style={styles.cartaoDescricao}>
          <Text style={styles.labelSinopse}>SOBRE O JOGO</Text>
          <Text style={styles.descricao}>{jogo.descricao}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.botao,
            { backgroundColor: jaFavoritado || adicionando ? '#475569' : '#7C4DFF' },
          ]}
          onPress={handleAdicionarFavorito}
          disabled={adicionando || jaFavoritado}
          activeOpacity={0.8}
        >
          <Text style={styles.iconeCoracao}>♥</Text>
          <Text style={styles.textoBotao}>
            {adicionando ? 'Adicionando...' : jaFavoritado ? 'Já nos Favoritos' : 'Adicionar aos Favoritos'}
          </Text>
        </TouchableOpacity>

        {feedback && (
          <Text style={[styles.feedback, { color: corFeedback }]}>{feedback.texto}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  tela: { flex: 1, backgroundColor: '#0B0D14' },
  container: { paddingBottom: 28 },
  hero: { height: 290, backgroundColor: '#111827' },
  capa: { width: '100%', height: '100%' },
  sombraHero: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 12, 22, 0.24)',
  },
  conteudo: { paddingHorizontal: 16, gap: 12, marginTop: -34 },
  cartaoJogo: {
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#171923',
    borderWidth: 1,
    borderColor: '#242735',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  linhaMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  meta: {
    color: '#D0BCFF',
    backgroundColor: '#332653',
    borderRadius: 6,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: '600',
  },
  titulo: { color: '#F8FAFC', fontSize: 18, fontWeight: '800', lineHeight: 22 },
  divisor: { height: 1, backgroundColor: '#292C38', marginTop: 10, marginBottom: 8 },
  linhaPreco: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  labelPreco: { color: '#8B8E9B', fontSize: 9, letterSpacing: 0.8, fontWeight: '600' },
  preco: {
    color: '#42D9F5',
    fontSize: 20,
    fontWeight: '900',
    textShadowColor: 'rgba(34, 211, 238, 0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  cartaoDescricao: {
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#171923',
    borderWidth: 1,
    borderColor: '#242735',
    gap: 7,
  },
  labelSinopse: { color: '#F8FAFC', fontSize: 11, fontWeight: '800' },
  descricao: { color: '#C0C2CC', fontSize: 11, lineHeight: 16 },
  botao: {
    minHeight: 46,
    marginTop: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
    shadowColor: '#26C6DA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.24,
    shadowRadius: 8,
    elevation: 5,
  },
  iconeCoracao: { color: '#FFFFFF', fontSize: 15 },
  textoBotao: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
  feedback: { textAlign: 'center', fontSize: 14, fontWeight: '600' },
  texto: { fontSize: 15, textAlign: 'center' },
});
