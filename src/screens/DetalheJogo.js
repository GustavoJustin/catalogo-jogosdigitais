import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useTema } from '../context/ThemeContext';
import { buscarJogoPorId, adicionarFavorito } from '../services/api';

export default function DetalheJogo({ route }) {
  const { jogoId } = route.params;
  const { cores, modoEscuro } = useTema();

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
  const corBotao = jaFavoritado || adicionando ? cores.border : cores.primary;
  const corTextoBotao = jaFavoritado || adicionando ? cores.textSecondary : cores.primaryText;
  const preco = jogo.preco.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <ScrollView
      style={[styles.tela, { backgroundColor: cores.background }]}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.hero, { backgroundColor: cores.card }]}>
        <Image source={{ uri: jogo.capa }} style={styles.capa} resizeMode="cover" />
        <View
          style={[
            styles.sombraHero,
            { backgroundColor: modoEscuro ? 'rgba(8, 12, 22, 0.24)' : 'rgba(255, 255, 255, 0.08)' },
          ]}
        />
      </View>

      <View style={styles.conteudo}>
        <View
          style={[
            styles.cartaoJogo,
            { backgroundColor: cores.card, borderColor: cores.border },
          ]}
        >
          <View style={styles.linhaMeta}>
            <Text
              style={[
                styles.meta,
                {
                  color: modoEscuro ? '#D0BCFF' : '#5E438F',
                  backgroundColor: modoEscuro ? '#332653' : '#EEE7FA',
                },
              ]}
            >
              {jogo.empresa} · {jogo.genero}
            </Text>
          </View>
          <Text style={[styles.titulo, { color: cores.text }]}>{jogo.titulo}</Text>
          <View style={[styles.divisor, { backgroundColor: cores.border }]} />
          <View style={styles.linhaPreco}>
            <Text style={[styles.labelPreco, { color: cores.textSecondary }]}>PREÇO OFICIAL</Text>
            <Text style={[styles.preco, { color: modoEscuro ? '#42D9F5' : '#087F95' }]}>
              R$ {preco}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.cartaoDescricao,
            { backgroundColor: cores.card, borderColor: cores.border },
          ]}
        >
          <Text style={[styles.labelSinopse, { color: cores.text }]}>SOBRE O JOGO</Text>
          <Text style={[styles.descricao, { color: cores.textSecondary }]}>{jogo.descricao}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.botao,
            {
              backgroundColor: corBotao,
              shadowColor: modoEscuro ? '#26C6DA' : cores.primary,
              shadowOpacity: modoEscuro ? 0.24 : 0.16,
            },
          ]}
          onPress={handleAdicionarFavorito}
          disabled={adicionando || jaFavoritado}
          activeOpacity={0.8}
        >
          <Text style={[styles.iconeCoracao, { color: corTextoBotao }]}>♥</Text>
          <Text style={[styles.textoBotao, { color: corTextoBotao }]}>
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
  tela: { flex: 1 },
  container: { paddingBottom: 28 },
  hero: { height: 290 },
  capa: { width: '100%', height: '100%' },
  sombraHero: {
    ...StyleSheet.absoluteFillObject,
  },
  conteudo: { paddingHorizontal: 16, gap: 12, marginTop: -34 },
  cartaoJogo: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  linhaMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  meta: {
    borderRadius: 6,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: '600',
  },
  titulo: { fontSize: 18, fontWeight: '800', lineHeight: 22 },
  divisor: { height: 1, marginTop: 10, marginBottom: 8 },
  linhaPreco: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  labelPreco: { fontSize: 9, letterSpacing: 0.8, fontWeight: '600' },
  preco: {
    fontSize: 20,
    fontWeight: '900',
    textShadowColor: 'rgba(34, 211, 238, 0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  cartaoDescricao: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 7,
  },
  labelSinopse: { fontSize: 11, fontWeight: '800' },
  descricao: { fontSize: 11, lineHeight: 16 },
  botao: {
    minHeight: 46,
    marginTop: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  iconeCoracao: { fontSize: 15 },
  textoBotao: { fontWeight: '800', fontSize: 12 },
  feedback: { textAlign: 'center', fontSize: 14, fontWeight: '600' },
  texto: { fontSize: 15, textAlign: 'center' },
});
