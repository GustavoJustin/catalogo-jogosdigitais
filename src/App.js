import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider, useTema } from './context/ThemeContext';
import ListaJogos from './screens/ListaJogos';
import DetalheJogo from './screens/DetalheJogo';
import Favoritos from './screens/Favoritos';
import Configuracoes from './screens/Configuracoes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TituloPagina({
  children,
  corIndicador,
  corTexto,
  maiusculo = false,
  subtitulo,
}) {
  return (
    <View style={styles.tituloPagina}>
      {subtitulo ? (
        <View style={styles.blocoTitulo}>
          <Text style={[styles.subtituloPagina, { color: corIndicador }]}>{subtitulo}</Text>
          <View style={styles.linhaTitulo}>
            <View style={[styles.indicadorQuadrado, { backgroundColor: corIndicador }]} />
            <Text style={[styles.textoTitulo, styles.tituloGrande, { color: corTexto }]}>
              {children}
            </Text>
          </View>
        </View>
      ) : (
        <>
          <View style={[styles.indicador, { backgroundColor: corIndicador }]} />
          <Text
            style={[
              styles.textoTitulo,
              { color: corTexto },
              maiusculo && styles.maiusculo,
            ]}
          >
            {children}
          </Text>
        </>
      )}
    </View>
  );
}

function IconeControle({ color }) {
  return (
    <View style={styles.iconeControle}>
      <View style={[styles.corpoControle, { backgroundColor: color }]}>
        <View style={styles.direcionalHorizontal} />
        <View style={styles.direcionalVertical} />
        <View style={[styles.botaoControle, styles.botaoControleUm]} />
        <View style={[styles.botaoControle, styles.botaoControleDois]} />
      </View>
    </View>
  );
}

function CatalogoStack() {
  const { cores } = useTema();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.header },
        headerTintColor: cores.headerText,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="ListaJogos"
        component={ListaJogos}
        options={({ navigation }) => ({
          headerTitle: () => (
            <TituloPagina corIndicador="#4ADEB2" corTexto={cores.headerText} maiusculo>
              Catálogo
            </TituloPagina>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.getParent().navigate('Configuracoes')}
              accessibilityRole="button"
              accessibilityLabel="Abrir configurações"
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: cores.card,
              }}
            >
              <Text style={{ color: cores.textSecondary, fontSize: 16 }}>⚙︎</Text>
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="DetalheJogo"
        component={DetalheJogo}
        options={{
          headerTitle: () => (
            <TituloPagina corIndicador="#42D9F5" corTexto={cores.headerText}>
              Detalhes do Jogo
            </TituloPagina>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navegacao() {
  const { cores, modoEscuro } = useTema();

  return (
    <NavigationContainer>
      <StatusBar style={modoEscuro ? 'light' : 'dark'} backgroundColor={cores.background} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: cores.tabBar,
            borderTopColor: cores.border,
            height: 58,
            paddingTop: 4,
            paddingBottom: 4,
          },
          tabBarActiveTintColor: cores.primary,
          tabBarInactiveTintColor: cores.textSecondary,
          headerStyle: { backgroundColor: cores.header },
          headerTintColor: cores.headerText,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Tab.Screen
          name="Catalogo"
          component={CatalogoStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Catálogo',
            tabBarActiveTintColor: '#B89AFF',
            tabBarIcon: ({ color }) => <IconeControle color={color} />,
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={Favoritos}
          options={{
            headerTitle: () => (
              <TituloPagina corIndicador="#4ADEB2" corTexto={cores.headerText} maiusculo>
                Favoritos
              </TituloPagina>
            ),
            tabBarActiveTintColor: '#E34B55',
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.iconeCoracao, { color: focused ? '#E34B55' : '#858493' }]}>
                ♥
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{
            headerTitle: () => (
              <TituloPagina
                corIndicador="#42D9F5"
                corTexto={cores.headerText}
                subtitulo="SYSTEM // VAULT"
              >
                Configurações
              </TituloPagina>
            ),
            tabBarLabel: 'Config',
            tabBarActiveTintColor: '#37DDF5',
            tabBarIcon: ({ focused }) => (
              <Text
                style={[
                  styles.iconeConfiguracao,
                  {
                    color: focused ? '#37DDF5' : '#858493',
                    textShadowColor: focused ? 'rgba(55, 221, 245, 0.8)' : 'transparent',
                  },
                ]}
              >
                ⚙
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  tituloPagina: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  blocoTitulo: {
    gap: 2,
  },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  indicador: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  indicadorQuadrado: {
    width: 6,
    height: 6,
    borderRadius: 1,
  },
  textoTitulo: {
    fontSize: 11,
    fontWeight: '800',
  },
  maiusculo: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  tituloGrande: {
    fontSize: 13,
    letterSpacing: 0,
    textTransform: 'none',
  },
  subtituloPagina: {
    fontSize: 6,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginLeft: 12,
  },
  iconeControle: {
    width: 24,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  corpoControle: {
    width: 20,
    height: 11,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  direcionalHorizontal: {
    position: 'absolute',
    left: 3,
    top: 5,
    width: 6,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#171820',
  },
  direcionalVertical: {
    position: 'absolute',
    left: 5,
    top: 3,
    width: 2,
    height: 6,
    borderRadius: 1,
    backgroundColor: '#171820',
  },
  botaoControle: {
    position: 'absolute',
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: '#171820',
  },
  botaoControleUm: {
    right: 4,
    top: 3,
  },
  botaoControleDois: {
    right: 2,
    top: 6,
  },
  iconeCoracao: {
    fontSize: 17,
    lineHeight: 20,
  },
  iconeConfiguracao: {
    fontSize: 17,
    lineHeight: 20,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
};

export default function App() {
  return (
    <ThemeProvider>
      <Navegacao />
    </ThemeProvider>
  );
}
