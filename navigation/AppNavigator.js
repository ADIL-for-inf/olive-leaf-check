// AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importation des écrans
import AccueilScreen from '../app/AccueilScreen';
import DetectionScreen from '../app/DetectionScreen';
import HistoryScreen from '../app/HistoryScreen';
import SettingsScreen from '../app/SettingsScreen';
import AproposScreen from '../app/AproposScreen';


const Tab = createBottomTabNavigator();
const HistoryStack = createStackNavigator();
const RootStack = createStackNavigator();

// Créez un Stack Navigator pour l'historique
function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen 
        name="HistoriqueMain" 
        component={HistoryScreen} 
        options={{ headerShown: false }} 
      />
      <HistoryStack.Screen 
        name="DetectionDetails" 
        component={DetectionDetailsScreen} 
        options={{ 
          title: 'Détails de détection',
          headerStyle: {
            backgroundColor: '#2A2D3F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
    </HistoryStack.Navigator>
  );
}

// Créez le Tab Navigator principal
function MainTabs() {
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
      <Tab.Screen name="Historique" component={HistoryStackScreen} />
      <Tab.Screen name="Paramètres" component={SettingsScreen} />
      <Tab.Screen name="À propos" component={AproposScreen} />
    </Tab.Navigator>
  );
}
