import React, { useEffect, useRef } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Animated,
    SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
    primary: '#2c3e50',
    secondary: '#7f8c8d',
    white: '#ffffff',
    gradientStart: '#a8c0ff',
    gradientEnd: '#99f2c8'
};

const FONTS = {
    h1: 32,
    h2: 24,
    body: 18,
};

const textShadow = {
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
};

export default function AccueilScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <SafeAreaView style={styles.flex}>
            <StatusBar style="light" />
            <LinearGradient
                colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
                        <Image
                            source={require('../assets/images/LOGO.png')}
                            style={styles.logo}
                            resizeMode="contain"
                            accessibilityLabel="Logo de l'application OliveLeaf Check"
                        />
                        {/* Suppression du bouton "A propos" */}
                    </Animated.View>

                    <Text style={styles.title}>Bienvenue 👋</Text>

                    <Text style={styles.subtitle}>
                        Protégez vos oliviers en détectant facilement les maladies des feuilles 🌿
                    </Text>

                    {/* Suppression de la section "showDetails" */}

                    {/* Ajout d'une image illustrative */}
                    <Image
                        source={require('../assets/images/photo.png')}
                        style={styles.oliveLeafImage}
                        resizeMode="contain"
                        accessibilityLabel="Exemple de feuille d'olivier saine et malade"
                    />

                    {/* Suppression du bouton "Scanner une Feuille" */}

                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}

// Validation des props
AccueilScreen.propTypes = {
    // navigation: PropTypes.shape({
    //     navigate: PropTypes.func.isRequired,
    // }).isRequired,
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 24,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 40,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Centrer l'image horizontalement
        alignItems: 'center', // Centrer l'image verticalement
        width: '100%',
        marginBottom: 24,
    },
    logo: {
        width: 180,
        height: 130,
    },
    title: {
        fontSize: FONTS.h1,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 16,
        textAlign: 'center',
        ...textShadow,
    },
    subtitle: {
        fontSize: FONTS.body,
        color: COLORS.white,
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 32,
        paddingHorizontal: 16,
        ...textShadow,
    },
    oliveLeafImage: {
        width: 250,
        height: 180,
        marginBottom: 32,
    },
    
});