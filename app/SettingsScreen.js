import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = {
    primary: '#2c3e50',
    secondary: '#7f8c8d',
    white: '#ffffff',
    gradientStart: '#a8c0ff',
    gradientEnd: '#99f2c8',
    accentGreen: '#4CAF50',
};

const FONTS = {
    h1: 24,
    h2: 20,
    body: 16,
    small: 14,
};

export default function Settings() {
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        language: 'Français'
    });

    // Charger les paramètres au montage
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSettings = await AsyncStorage.getItem('appSettings');
                if (savedSettings) setSettings(JSON.parse(savedSettings));
            } catch (error) {
                console.error('Erreur de chargement:', error);
            }
        };
        loadSettings();
    }, []);

    // Sauvegarder les paramètres à chaque changement
    useEffect(() => {
        const saveSettings = async () => {
            try {
                await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
            } catch (error) {
                console.error('Erreur de sauvegarde:', error);
            }
        };
        saveSettings();
    }, [settings]);

    const toggleSetting = (setting) => {
        setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
    };

    const changeLanguage = (selectedLanguage) => {
        setSettings(prev => ({ ...prev, language: selectedLanguage }));
        Alert.alert(
            'Langue changée', 
            `L'application est maintenant en ${selectedLanguage}.`,
            [{ text: 'OK', onPress: () => applyLanguage(selectedLanguage) }]
        );
    };

    const applyLanguage = (lang) => {
        // Ici vous devrez implémenter la logique de traduction réelle
        console.log('Langue appliquée:', lang);
    };

    return (
        <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={styles.linearGradient}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>Paramètres</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Général</Text>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingLabel}>Notifications</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: COLORS.accentGreen }}
                                thumbColor={settings.notifications ? '#f4f3f4' : '#f4f3f4'}
                                value={settings.notifications}
                                onValueChange={() => toggleSetting('notifications')}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingLabel}>Mode Sombre</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: COLORS.accentGreen }}
                                thumbColor={settings.darkMode ? '#f4f3f4' : '#f4f3f4'}
                                value={settings.darkMode}
                                onValueChange={() => toggleSetting('darkMode')}
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Apparence</Text>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingLabel}>Langue</Text>
                            <TouchableOpacity
                                style={styles.languageButton}
                                onPress={() => {
                                    Alert.alert(
                                        'Changer la langue',
                                        'Choisissez la langue de l\'application',
                                        ['Français', 'Anglais', 'Arabe'].map(lang => ({
                                            text: lang,
                                            onPress: () => changeLanguage(lang),
                                        })),
                                        { cancelable: true }
                                    );
                                }}
                            >
                                <Text style={styles.languageText}>{settings.language}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: FONTS.h1,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 30,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10,
        padding: 15,
    },
    sectionTitle: {
        fontSize: FONTS.h2,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.secondary,
        paddingBottom: 5,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    settingLabel: {
        fontSize: FONTS.body,
        color: COLORS.primary,
    },
    languageButton: {
        backgroundColor: COLORS.white,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.secondary,
    },
    languageText: {
        fontSize: FONTS.body,
        color: COLORS.primary,
    },
});