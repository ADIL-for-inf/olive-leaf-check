// app/_layout.js
import React, { useEffect, useState } from 'react';
import { Stack, useRouter, usePathname } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContextProvider, useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { loadUserLanguage } from '../i18n'; // Assure-toi de créer ce helper

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  // Charge la langue sauvegardée avant rendu
  useEffect(() => {
    (async () => {
      await loadUserLanguage();
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AppContextProvider>
      <InnerLayout />
    </AppContextProvider>
  );
}

function InnerLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { settings } = useAppContext(); // pour thème ou autres si besoin

  // Items de navigation avec clés de traduction
  const navItems = [
    { route: '/',               icon: 'home',              labelKey: 'home' },
    { route: '/DetectionScreen',icon: 'camera',            labelKey: 'detection' },
    { route: '/HistoryScreen',  icon: 'time',              labelKey: 'history' },
    { route: '/SettingsScreen', icon: 'settings',          labelKey: 'settings' },
    { route: '/AproposScreen',  icon: 'information-circle', labelKey: 'about' },
  ];

  return (
    <View style={styles.container}>
      {/* Stack rendra tes écrans définis dans app/ */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { paddingBottom: 70 } // espace pour la nav bar
        }}
      />

      {/* Barre de navigation fixe */}
      <View style={styles.navBar}>
        {navItems.map(item => {
          const isActive = pathname === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => router.push(item.route)}
              style={styles.navButton}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={isActive ? '#4ECDC4' : '#666'}
              />
              <Text style={[styles.navLabel, { color: isActive ? '#4ECDC4' : '#666' }]}>
                {t(item.labelKey)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loaderContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 100,
  },
  navButton: {
    alignItems: 'center',
    minWidth: 60,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
