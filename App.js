import 'react-native-gesture-handler'; // Important pour la gestion des gestes de navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importation des écrans depuis le dossier app
import AproposScreen from './app/index';
import DetectionScreen from './app/DetectionScreen';
import HistoryScreen from './app/HistoryScreen';
import SettingsScreen from './app/SettingsScreen';
import AccueilScreen from './app/index';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Accueil') iconName = 'home';
          else if (route.name === 'Détection') iconName = 'camera';
          else if (route.name === 'Historique') iconName = 'time';
          else if (route.name === 'Paramètres') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4ECDC4',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} />
      <Tab.Screen name="Détection" component={DetectionScreen} />
      <Tab.Screen name="Historique" component={HistoryScreen} />
      <Tab.Screen name="Paramètres" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Apropos" component={AproposScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}