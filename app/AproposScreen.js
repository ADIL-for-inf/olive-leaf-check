import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

// 🎨 Définition des constantes de style (similaire à AccueilScreen avec ajout de vert)
const COLORS = {
    white: '#ffffff',
    primary: '#2c3e50', // Bleu primaire (inchangé)
    secondary: '#7f8c8d', // Gris secondaire (inchangé)
    gradientStart: '#a8c0ff', // Bleu clair du dégradé de AccueilScreen
    gradientEnd: '#99f2c8', // Vert clair du dégradé de AccueilScreen
    accentGreen: '#4CAF50', // Vert accent pour le domaine agricole
    lightGreen: '#81c784', // Vert clair pour des touches subtiles
};

const FONTS = {
    h1: 32, // Taille de titre principal (comme AccueilScreen)
    h2: 24, // Taille de sous-titre (comme AccueilScreen)
    body: 18, // Taille de corps de texte (comme AccueilScreen)
};

const AproposScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Image
                    source={require('../assets/images/LOGO.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.title}>À propos de OliveLeaf Check</Text>

                <Text style={styles.tagline}>Votre allié intelligent pour la santé de vos oliviers</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notre Mission</Text>
                    <Text style={styles.sectionContent}>
                        Notre mission est de fournir aux oléiculteurs, qu'ils soient professionnels ou amateurs, un outil simple et efficace pour détecter rapidement et précisément les maladies et les carences des feuilles de leurs oliviers. Nous croyons en l'importance de la prévention et de l'intervention précoce pour garantir des récoltes saines et abondantes.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Comment ça Marche ?</Text>
                    <Text style={styles.sectionContent}>
                        OliveLeaf Check utilise une technologie avancée d'intelligence artificielle pour analyser les photos des feuilles de vos oliviers. Il vous suffit de pointer votre caméra, de prendre une photo, et notre application vous fournira un diagnostic en quelques secondes. Nous vous donnerons ensuite des informations détaillées sur la maladie détectée et des conseils pour la traiter.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Fonctionnalités Clés</Text>
                    <Text style={styles.sectionContent}>
                        • Détection rapide et précise des maladies des feuilles d'olivier.
                        {"\n"}• Identification d'un large éventail de maladies et de carences.
                        {"\n"}• Informations détaillées sur chaque maladie, y compris les symptômes et les traitements recommandés.
                        {"\n"}• Interface utilisateur simple et intuitive pour une utilisation facile.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notre Engagement</Text>
                    <Text style={styles.sectionContent}>
                        Nous nous engageons à améliorer continuellement OliveLeaf Check en ajoutant de nouvelles fonctionnalités et en affinant nos algorithmes de détection. Votre feedback est précieux pour nous aider à atteindre cet objectif.
                    </Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => console.log('Politique de Confidentialité')}>
                        <Text style={styles.footerLink}>Politique de Confidentialité</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerSeparator}>•</Text>
                    <TouchableOpacity onPress={() => console.log('Conditions d\'Utilisation')}>
                        <Text style={styles.footerLink}>Conditions d'Utilisation</Text>
                    </TouchableOpacity>
                    <Text style={styles.copyright}>© 2025 OliveLeaf Check</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.gradientEnd, // Utilisation d'une couleur verte claire de l'accueil pour le fond
    },
    contentContainer: {
        paddingVertical: 30,
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: FONTS.h1,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
        textAlign: 'center',
    },
    tagline: {
        fontSize: FONTS.h2 - 4,
        color: COLORS.secondary,
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 30,
        width: '100%',
        backgroundColor: COLORS.white, // Fond blanc pour les sections pour plus de contraste
        padding: 20,
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: FONTS.h2,
        fontWeight: 'bold',
        color: COLORS.accentGreen, // Utilisation du vert accent pour les titres de section
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: FONTS.body,
        color: COLORS.secondary,
        lineHeight: 24,
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
    },
    footerLink: {
        color: COLORS.primary,
        fontSize: FONTS.body - 2,
        textDecorationLine: 'underline',
        marginBottom: 5,
    },
    footerSeparator: {
        fontSize: FONTS.body - 2,
        color: COLORS.secondary,
        marginHorizontal: 10,
    },
    copyright: {
        fontSize: FONTS.body - 4,
        color: COLORS.secondary,
        marginTop: 10,
    },
});

export default AproposScreen;