
// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppContextProvider } from './context/AppContext'; // Chemin d'import correct

// Importation des écrans
import AccueilScreen from './app/AccueilScreen';
import DetectionScreen from './app/DetectionScreen';
import HistoryScreen from './app/HistoryScreen';
import SettingsScreen from './app/SettingsScreen';
import AproposScreen from './app/AproposScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Détection') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Historique') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Paramètres') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4ECDC4',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
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
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={TabNavigator} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Apropos" 
            component={AproposScreen} 
            options={{ 
              title: 'À propos',
              headerBackTitle: 'Retour',
              headerTintColor: '#4ECDC4',
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}