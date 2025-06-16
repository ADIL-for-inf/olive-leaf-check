import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Animated,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import CustomStatusBar from '../components/CustomStatusBar';

const { width } = Dimensions.get('window');

export default function AccueilScreen() {
    const { t } = useTranslation();
    const { settings, COLORS, SHADOWS } = useAppContext();
    
    // Animation values
    const headerFadeAnim = useRef(new Animated.Value(0)).current;
    const contentSlideUpAnim = useRef(new Animated.Value(24)).current;
    const contentFadeAnim = useRef(new Animated.Value(0)).current;
    const imageScaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(headerFadeAnim, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.spring(contentSlideUpAnim, {
                    toValue: 0,
                    friction: 7,
                    tension: 100,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(contentFadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(imageScaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 80,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const SPACING = {
        xxs: 4,
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
        xl: 48,
        xxl: 64,
    };

    const FONTS = {
        h1: 36,
        h2: 28,
        h3: 22,
        body: 17,
        small: 14,
    };

    // Données des fonctionnalités avec clés de traduction
    const features = [
        { 
            icon: "camera-alt", 
            titleKey: "featureScanTitle", 
            descriptionKey: "featureScanDescription" 
        },
        { 
            icon: "lightbulb-outline", 
            titleKey: "featureAdviceTitle", 
            descriptionKey: "featureAdviceDescription" 
        },
        { 
            icon: "history", 
            titleKey: "featureHistoryTitle", 
            descriptionKey: "featureHistoryDescription" 
        },
        { 
            icon: "analytics", 
            titleKey: "featureStatsTitle", 
            descriptionKey: "featureStatsDescription" 
        }
    ];

    // Couleurs du gradient en fonction du mode
    const gradientColors = settings.darkMode 
        ? ['#121212', '#1e1e1e', '#121212'] 
        : ['#3498db', '#4ECDC4', '#2ecc71'];

    return (
        <SafeAreaView style={[styles.flexContainer, { backgroundColor: COLORS.background }]}>
            <CustomStatusBar />
            <LinearGradient
                colors={gradientColors}
                style={styles.gradientBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header Section: Logo & Welcome */}
                    <Animated.View style={[
                        styles.headerContainer,
                        { 
                            opacity: headerFadeAnim, 
                            transform: [{ translateY: contentSlideUpAnim }] 
                        }
                    ]}>
                        <Image
                            source={require('../assets/images/icon.png')}
                            style={styles.logo}
                            resizeMode="contain"
                            accessibilityLabel={t('logoAccessibility')}
                        />
                        <Text style={[styles.mainTitle, { color: COLORS.text }]}>
                            {t('welcomeTitle')}
                        </Text>
                        <Text style={[styles.tagline, { color: COLORS.secondaryText }]}>
                            {t('welcomeSubtitle')}
                        </Text>
                    </Animated.View>

                    {/* Value Proposition / Introduction Card */}
                    <Animated.View style={[
                        styles.cardContainer,
                        { 
                            opacity: contentFadeAnim, 
                            transform: [{ translateY: contentSlideUpAnim }],
                            backgroundColor: COLORS.cardBg,
                            borderColor: COLORS.cardBorder,
                            ...SHADOWS.card
                        }
                    ]}>
                        <Ionicons 
                            name="leaf" 
                            size={SPACING.lg} 
                            color={COLORS.accentGreen} 
                            style={styles.cardIcon} 
                        />
                        <Text style={[styles.cardTitle, { color: COLORS.text }]}>
                            {t('detectTitle')}
                        </Text>
                        <Text style={[styles.cardDescription, { color: COLORS.secondaryText }]}>
                            {t('detectDescription')}
                        </Text>
                    </Animated.View>

                    {/* Illustrative Image */}
                    <Animated.View style={[
                        styles.imageContainer,
                        { 
                            opacity: contentFadeAnim, 
                            transform: [{ scale: imageScaleAnim }],
                            borderColor: COLORS.cardBorder,
                            ...SHADOWS.card
                        }
                    ]}>
                        <Image
                            source={require('../assets/images/photo.png')}
                            style={styles.oliveLeafImage}
                            resizeMode="cover"
                            accessibilityLabel={t('oliveLeafImageAccessibility')}
                        />
                    </Animated.View>

                    {/* Key Features Section */}
                    <Animated.View style={[
                        styles.featuresSection,
                        { 
                            opacity: contentFadeAnim, 
                            transform: [{ translateY: contentSlideUpAnim }] 
                        }
                    ]}>
                        <Text style={[styles.sectionHeading, { color: COLORS.text }]}>
                            {t('featuresTitle')}
                        </Text>
                        <View style={styles.featureGrid}>
                            {features.map((feature, index) => (
                                <FeatureCard 
                                    key={index}
                                    icon={feature.icon}
                                    title={t(feature.titleKey)}
                                    description={t(feature.descriptionKey)}
                                    COLORS={COLORS}
                                    SPACING={SPACING}
                                    SHADOWS={SHADOWS}
                                />
                            ))}
                        </View>
                    </Animated.View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}

// Composant réutilisable FeatureCard
const FeatureCard = ({ icon, title, description, COLORS, SPACING, SHADOWS }) => (
    <View style={[styles.featureCard, { 
        backgroundColor: COLORS.cardBg, 
        borderColor: COLORS.cardBorder,
        ...SHADOWS.card 
    }]}>
        <View style={[styles.featureIconCircle, { backgroundColor: COLORS.accentGreen }]}>
            <MaterialIcons name={icon} size={SPACING.lg} color={COLORS.white} />
        </View>
        <Text style={[styles.featureCardTitle, { color: COLORS.text }]}>{title}</Text>
        <Text style={[styles.featureCardDescription, { color: COLORS.secondaryText }]}>{description}</Text>
    </View>
);

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 48,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 64,
    },
    logo: {
        width: width * 0.6,
        height: width * 0.6 * (130 / 180),
        marginBottom: 8,
    },
    mainTitle: {
        fontSize: 36,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 4,
        letterSpacing: 1,
        lineHeight: 43,
    },
    tagline: {
        fontSize: 22,
        textAlign: 'center',
        paddingHorizontal: 24,
        lineHeight: 29,
    },
    cardContainer: {
        borderRadius: 20,
        padding: 24,
        marginBottom: 48,
        width: width * 0.9,
        alignItems: 'center',
        borderWidth: 1,
    },
    cardIcon: {
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 17,
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 4,
    },
    imageContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 48,
        borderWidth: 1,
    },
    oliveLeafImage: {
        width: width * 0.85,
        height: width * 0.85 * (180 / 250),
    },
    featuresSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 64,
        paddingHorizontal: 24,
    },
    sectionHeading: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 32,
    },
    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    featureCard: {
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
        width: '48%',
        alignItems: 'center',
        borderWidth: 1,
    },
    featureIconCircle: {
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    featureCardTitle: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 2,
    },
    featureCardDescription: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
});