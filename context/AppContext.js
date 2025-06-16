import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

// Définition des palettes de couleurs
const lightColors = {
  background: '#f8f9fa',
  cardBg: 'rgba(255,255,255,0.7)',
  cardBorder: 'rgba(0,0,0,0.1)',
  text: '#1a222c',
  secondaryText: '#2c3e50',
  accentGreen: '#4CAF50',
  accentBlue: '#2196F3',
  accentRed: '#f44336',
  accentYellow: '#FFC107',
  switchTrackOn: 'rgba(76,175,80,0.5)',
  switchThumbOn: '#4CAF50',
  switchTrackOff: 'rgba(0,0,0,0.1)',
  switchThumbOff: '#f5f5f5',
  modalBg: '#fff',
  modalText: '#1a222c',
  modalBorder: '#e0e0e0',
  gradientStart: '#a8c0ff',
  gradientEnd: '#99f2c8',
  placeholderText: '#bdc3c7',
  inputBg: '#fff',
  inputText: '#1a222c',
  inputBorder: '#ddd',
};

const darkColors = {
  background: '#121212',
  cardBg: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.1)',
  text: '#fff',
  secondaryText: '#bbb',
  accentGreen: '#66BB6A',
  accentBlue: '#64B5F6',
  accentRed: '#EF5350',
  accentYellow: '#FFCA28',
  switchTrackOn: 'rgba(102,187,106,0.5)',
  switchThumbOn: '#66BB6A',
  switchTrackOff: 'rgba(255,255,255,0.1)',
  switchThumbOff: '#f5f5f5',
  modalBg: '#1e1e1e',
  modalText: '#fff',
  modalBorder: '#333',
  gradientStart: '#0f0f0f',
  gradientEnd: '#121212',
  placeholderText: 'rgba(255,255,255,0.3)',
  inputBg: 'rgba(255,255,255,0.1)',
  inputText: '#fff',
  inputBorder: '#333',
};

// Définition des ombres
const lightShadows = {
  text: { textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  card: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
  modal: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 10 }
};

const darkShadows = {
  text: { textShadowColor: 'rgba(255,255,255,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  card: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 6 },
  modal: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 12 }
};

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({ children }) {
  const [settings, setSettings] = useState({ 
    darkMode: false, 
    notifications: true, 
    language: i18n.language,
    serverIp: '192.168.1.153:5000' // Valeur par défaut
  });

  // Calculer les couleurs et ombres en fonction du mode
  const { COLORS, SHADOWS } = useMemo(() => {
    return {
      COLORS: settings.darkMode ? darkColors : lightColors,
      SHADOWS: settings.darkMode ? darkShadows : lightShadows
    };
  }, [settings.darkMode]);

  // Charger les settings au démarrage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem('appSettings');
        if (saved) {
          const s = JSON.parse(saved);
          setSettings(s);
          i18n.changeLanguage(s.language);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
      }
    };
    loadSettings();
  }, []);

  // Persister les settings
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
        i18n.changeLanguage(settings.language);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des paramètres:', error);
      }
    };
    saveSettings();
  }, [settings]);

  const toggleDarkMode = () => setSettings(s => ({ ...s, darkMode: !s.darkMode }));
  const toggleNotifications = () => setSettings(s => ({ ...s, notifications: !s.notifications }));
  const changeLanguage = lang => setSettings(s => ({ ...s, language: lang }));
  
  // Ajout de la fonction pour mettre à jour l'IP du serveur
  const setServerIp = ip => setSettings(s => ({ ...s, serverIp: ip }));

  // Valeur du contexte
  const contextValue = useMemo(() => ({
    settings,
    COLORS,
    SHADOWS,
    toggleDarkMode,
    toggleNotifications,
    changeLanguage,
    setServerIp // Exposer la nouvelle fonction
  }), [settings, COLORS, SHADOWS]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}