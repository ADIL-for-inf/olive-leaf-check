import { Stack, useRouter, usePathname } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { route: '', icon: 'home', label: 'Accueil' },
    { route: './DetectionScreen', icon: 'camera', label: 'Détection' },
    { route: './HistoryScreen', icon: 'time', label: 'Historique' },
    { route: './SettingsScreen', icon: 'settings', label: 'Paramètres' },
    { route: './AproposScreen', icon: 'information-circle', label: 'À propos' },
  ];

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: styles.stackContent
        }}
      />
      
      {/* Barre de navigation ABSOLUE */}
      <View style={styles.navBar}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => router.push(item.route)}
            style={styles.navButton}
          >
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={pathname === item.route ? '#4ECDC4' : '#666'} 
            />
            <Text style={[
              styles.navLabel,
              { color: pathname === item.route ? '#4ECDC4' : '#666' }
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  stackContent: {
    paddingBottom: 70
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
    zIndex: 100
  },
  navButton: {
    alignItems: 'center',
    minWidth: 60
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4
  }
});
