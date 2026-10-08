import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CardJogo({ jogo, cores, onPress }) {
  const preco = jogo.preco.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}
      onPress={() => onPress(jogo.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: jogo.capa }} style={styles.capa} resizeMode="cover" />
      <View style={styles.info}>
        <View style={styles.cabecalho}>
          <View style={styles.textos}>
            <Text style={[styles.titulo, { color: cores.text }]} numberOfLines={2}>
              {jogo.titulo}
            </Text>
            <Text style={[styles.empresa, { color: cores.textSecondary }]} numberOfLines={1}>
              {jogo.empresa}
            </Text>
          </View>
        </View>
        <View style={styles.rodape}>
          <Text style={styles.preco}>R$ {preco}</Text>
          <Text style={styles.genero} numberOfLines={1}>{jogo.genero}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 72,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#292B36',
    backgroundColor: '#181A23',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 2,
  },
  capa: {
    width: 54,
    height: '100%',
  },
  info: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 9,
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  textos: {
    flex: 1,
    minWidth: 0,
  },
  titulo: {
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 12,
  },
  empresa: {
    fontSize: 8,
    marginTop: 2,
  },
  coracao: {
    color: '#A7AFC3',
    fontSize: 19,
    lineHeight: 19,
    marginTop: -2,
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  preco: {
    color: '#5DE1F5',
    fontSize: 10,
    fontWeight: '900',
  },
  genero: {
    maxWidth: '52%',
    overflow: 'hidden',
    borderRadius: 7,
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: '#D0BCFF',
    backgroundColor: '#332653',
    fontSize: 6,
    fontWeight: '700',
  },
});
