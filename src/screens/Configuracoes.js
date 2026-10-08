import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTema } from '../context/ThemeContext';

export default function Configuracoes() {
  const { cores, modoEscuro, alternarTema } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <View style={styles.secaoCabecalho}>
        <View style={styles.rotuloSecao}>
          <View style={styles.indicadorSecao} />
          <Text style={[styles.textoSecao, { color: cores.textSecondary }]}>
            DISPLAY & APARÊNCIA
          </Text>
        </View>
        <Text style={styles.identificadorSecao}>SLOT #01</Text>
      </View>

      <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
        <View style={styles.linha}>
          <View style={[styles.iconeTema, { backgroundColor: cores.background }]}>
            <Text style={styles.lua}>☾</Text>
          </View>
          <View style={styles.labelGroup}>
            <Text style={[styles.labelTitulo, { color: cores.text }]}>Tema escuro</Text>
            <Text style={[styles.labelDesc, { color: cores.textSecondary }]}>
              {modoEscuro ? 'Ativado' : 'Desativado'} — preferência salva
              automaticamente
            </Text>
          </View>
          <Switch
            value={modoEscuro}
            onValueChange={alternarTema}
            trackColor={{ false: cores.border, true: '#7655C8' }}
            thumbColor={modoEscuro ? '#D9C7FF' : '#F4F1FA'}
            accessibilityLabel="Ativar tema escuro"
          />
        </View>

        <View style={[styles.divisor, { backgroundColor: cores.border }]} />

        <View style={styles.rodapeCard}>
          <Text style={[styles.status, { color: cores.textSecondary }]}>
            STATUS: <Text style={styles.statusAtivo}>STANDBY</Text>
          </Text>
          <Text style={[styles.sync, { color: cores.textSecondary }]}>SYNC: LOCAL</Text>
        </View>
      </View>

      <View style={[styles.rodapeSistema, { borderColor: cores.border }]}>
        <View style={styles.estadoSistema}>
          <View style={styles.indicadorSistema} />
          <Text style={[styles.textoSistema, { color: cores.textSecondary }]}>
            GAMEVAULT PROTOCOL // v2.4.0
          </Text>
        </View>
        <Text style={[styles.textoSistema, { color: cores.textSecondary }]}>CORE OK</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 18,
    paddingBottom: 24,
  },
  secaoCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  rotuloSecao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  indicadorSecao: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ADEB2',
  },
  textoSecao: {
    fontSize: 7,
    letterSpacing: 0.7,
    fontWeight: '700',
  },
  identificadorSecao: {
    color: '#777386',
    fontSize: 6,
    letterSpacing: 0.7,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
    minHeight: 96,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  iconeTema: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  lua: {
    color: '#B89AFF',
    fontSize: 17,
    lineHeight: 19,
  },
  labelGroup: {
    flex: 1,
    gap: 5,
    paddingTop: 1,
  },
  labelTitulo: {
    fontSize: 10,
    fontWeight: '800',
  },
  labelDesc: {
    maxWidth: 165,
    fontSize: 7,
    lineHeight: 10,
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
    marginTop: 8,
    marginBottom: 7,
  },
  rodapeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: 6,
    letterSpacing: 0.4,
  },
  statusAtivo: {
    color: '#42D9F5',
    fontWeight: '800',
  },
  sync: {
    fontSize: 6,
    letterSpacing: 0.4,
  },
  rodapeSistema: {
    minHeight: 25,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 'auto',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  estadoSistema: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  indicadorSistema: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ADEB2',
  },
  textoSistema: {
    fontSize: 6,
    letterSpacing: 0.4,
  },
});
