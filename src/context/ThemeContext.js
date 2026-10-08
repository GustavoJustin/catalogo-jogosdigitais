import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pagina_virada:tema';

const temaClaro = {
  background: '#F5F3FA',
  card: '#FFFFFF',
  text: '#292635',
  textSecondary: '#777386',
  primary: '#7655C8',
  primaryText: '#FFFFFF',
  border: '#E3DFEC',
  error: '#C94F62',
  success: '#25866B',
  tabBar: '#FFFFFF',
  header: '#F5F3FA',
  headerText: '#292635',
};

const temaEscuro = {
  background: '#101116',
  card: '#181A23',
  text: '#F1F0F6',
  textSecondary: '#9295A8',
  primary: '#B89AFF',
  primaryText: '#FFFFFF',
  border: '#292B36',
  error: '#F87171',
  success: '#4ADE80',
  tabBar: '#111219',
  header: '#101116',
  headerText: '#F1F5F9',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((valor) => {
      if (valor !== null) setModoEscuro(valor === 'escuro');
    });
  }, []);

  function alternarTema() {
    const novoModo = !modoEscuro;
    setModoEscuro(novoModo);
    AsyncStorage.setItem(STORAGE_KEY, novoModo ? 'escuro' : 'claro');
  }

  const cores = modoEscuro ? temaEscuro : temaClaro;

  return (
    <ThemeContext.Provider value={{ modoEscuro, alternarTema, cores }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  return useContext(ThemeContext);
}
