import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importation des écrans
import AccueilScreen from '../app/AccueilScreen';
import DetectionScreen from '../app/DetectionScreen';
import HistoryScreen from '../app/HistoryScreen';
import SettingsScreen from '../app/SettingsScreen';
import AproposScreen from '../app/AproposScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff', height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Accueil':
              iconName = 'home';
              break;
            case 'Détection':
              iconName = 'camera';
              break;
            case 'Historique':
              iconName = 'time';
              break;
            case 'Paramètres':
              iconName = 'settings';
              break;
            case 'À propos':
              iconName = 'information-circle-outline';
              break;
            default:
              iconName = 'ellipse';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} />
      <Tab.Screen name="Détection" component={DetectionScreen} />
      <Tab.Screen name="Historique" component={HistoryScreen} />
      <Tab.Screen name="Paramètres" component={SettingsScreen} />
      <Tab.Screen name="À propos" component={AproposScreen} />
    </Tab.Navigator>
  );
}
