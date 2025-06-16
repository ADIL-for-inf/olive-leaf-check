import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Animated,
    Modal,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
    const { t } = useTranslation();
    const { 
        settings, 
        toggleDarkMode, 
        toggleNotifications, 
        changeLanguage,
        setServerIp 
    } = useAppContext();
    
    const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
    const [isIpModalVisible, setIpModalVisible] = useState(false);
    const [tempIp, setTempIp] = useState(settings.serverIp || '');

    const contentFadeAnim = useRef(new Animated.Value(0)).current;
    const contentSlideUpAnim = useRef(new Animated.Value(48)).current;

    const COLORS = useMemo(() => settings.darkMode ? {
        background: '#121212',
        cardBg: 'rgba(255,255,255,0.05)',
        cardBorder: 'rgba(255,255,255,0.1)',
        text: '#fff',
        secondaryText: '#bbb',
        accentGreen: '#66BB6A',
        accentBlue: '#64B5F6',
        accentRed: '#EF5350',
        switchTrackOn: 'rgba(102,187,106,0.5)',
        switchThumbOn: '#66BB6A',
        switchTrackOff: 'rgba(255,255,255,0.1)',
        switchThumbOff: '#f5f5f5',
        modalBg: '#1e1e1e',
        modalText: '#fff',
        modalBorder: '#333',
        inputBg: 'rgba(255,255,255,0.1)',
        inputText: '#fff',
        inputBorder: '#333',
    } : {
        background: '#f8f9fa',
        gradientStart: '#a8c0ff',
        gradientEnd: '#99f2c8',
        cardBg: 'rgba(255,255,255,0.7)',
        cardBorder: 'rgba(0,0,0,0.1)',
        text: '#1a222c',
        secondaryText: '#2c3e50',
        accentGreen: '#4CAF50',
        accentBlue: '#2196F3',
        accentRed: '#f44336',
        switchTrackOn: 'rgba(76,175,80,0.5)',
        switchThumbOn: '#4CAF50',
        switchTrackOff: 'rgba(0,0,0,0.1)',
        switchThumbOff: '#f5f5f5',
        modalBg: '#fff',
        modalText: '#1a222c',
        modalBorder: '#e0e0e0',
        inputBg: '#fff',
        inputText: '#1a222c',
        inputBorder: '#ddd',
    }, [settings.darkMode]);

    const FONTS = { h1: 36, body: 17, small: 14 };
    const SPACING = { xs: 8, sm: 16, md: 24, lg: 32, xl: 48 };

    const SHADOWS = settings.darkMode ? {
        text: { textShadowColor: 'rgba(255,255,255,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
        card: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 6 },
        modal: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 12 }
    } : {
        text: { textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
        card: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
        modal: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 10 }
    };

    useEffect(() => {
        Animated.parallel([
            Animated.timing(contentFadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.spring(contentSlideUpAnim, { toValue: 0, useNativeDriver: true })
        ]).start();
    }, []);

    useEffect(() => {
        setTempIp(settings.serverIp || '');
    }, [settings.serverIp]);

    const styles = createStyles(COLORS, FONTS, SPACING, SHADOWS, width);

    const languages = [
        { code: 'fr', label: 'Français' },
        { code: 'en', label: 'English' },
        { code: 'ar', label: 'العربية' },
    ];

    const validateIp = (ip) => {
        const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}(?::\d+)?$/;
        return ipPattern.test(ip);
    };

    const isValidIp = validateIp(tempIp);

    const handleSaveIp = () => {
        if (isValidIp) {
            setServerIp(tempIp);
            setIpModalVisible(false);
        }
    };

    return (
        <SafeAreaView style={styles.flexContainer}>
            <StatusBar style={settings.darkMode ? 'light' : 'dark'} />
            {settings.darkMode ? (
                <View style={styles.darkBackground} />
            ) : (
                <LinearGradient
                    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                    style={styles.gradientBackground}
                />
            )}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Animated.View style={[styles.settingsContainer, {
                    opacity: contentFadeAnim,
                    transform: [{ translateY: contentSlideUpAnim }]
                }]}>
                    <Text style={styles.title}>{t('settings')}</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLabelGroup}>
                            <MaterialIcons name="dark-mode" size={24} color={COLORS.accentBlue} />
                            <Text style={styles.settingLabel}>{t('darkMode')}</Text>
                        </View>
                        <Switch
                            trackColor={{ false: COLORS.switchTrackOff, true: COLORS.switchTrackOn }}
                            thumbColor={settings.darkMode ? COLORS.switchThumbOn : COLORS.switchThumbOff}
                            onValueChange={toggleDarkMode}
                            value={settings.darkMode}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLabelGroup}>
                            <Ionicons name="notifications" size={24} color={COLORS.accentBlue} />
                            <Text style={styles.settingLabel}>{t('notifications')}</Text>
                        </View>
                        <Switch
                            trackColor={{ false: COLORS.switchTrackOff, true: COLORS.switchTrackOn }}
                            thumbColor={settings.notifications ? COLORS.switchThumbOn : COLORS.switchThumbOff}
                            onValueChange={toggleNotifications}
                            value={settings.notifications}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => setLanguageModalVisible(true)}
                    >
                        <View style={styles.settingLabelGroup}>
                            <MaterialIcons name="language" size={24} color={COLORS.accentBlue} />
                            <Text style={styles.settingLabel}>{t('language')}</Text>
                        </View>
                        <View style={styles.languageDisplay}>
                            <Text style={styles.languageText}>{settings.language.toUpperCase()}</Text>
                            <MaterialIcons name="chevron-right" size={24} color={COLORS.secondaryText} />
                        </View>
                    </TouchableOpacity>

                    {/* Option pour configurer l'adresse IP du serveur */}
                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => setIpModalVisible(true)}
                    >
                        <View style={styles.settingLabelGroup}>
                            <MaterialIcons name="dns" size={24} color={COLORS.accentBlue} />
                            <Text style={styles.settingLabel}>{t('serverIp')}</Text>
                        </View>
                        <View style={styles.languageDisplay}>
                            <Text 
                                style={[
                                    styles.languageText, 
                                    !settings.serverIp && { color: COLORS.secondaryText, fontStyle: 'italic' }
                                ]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {settings.serverIp || t('notConfigured')}
                            </Text>
                            <MaterialIcons name="chevron-right" size={24} color={COLORS.secondaryText} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>

            {/* Modal pour la langue */}
            <Modal transparent visible={isLanguageModalVisible} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setLanguageModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>{t('chooseLanguage')}</Text>
                                {languages.map(lang => (
                                    <TouchableOpacity
                                        key={lang.code}
                                        style={styles.languageOption}
                                        onPress={() => {
                                            changeLanguage(lang.code);
                                            setLanguageModalVisible(false);
                                        }}
                                    >
                                        <Text style={styles.languageOptionText}>{lang.label}</Text>
                                        {settings.language === lang.code && (
                                            <MaterialIcons name="check-circle" size={24} color={COLORS.accentGreen} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity onPress={() => setLanguageModalVisible(false)} style={styles.modalCloseButton}>
                                    <Text style={styles.modalCloseButtonText}>{t('cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Modal pour l'adresse IP du serveur */}
            <Modal transparent visible={isIpModalVisible} animationType="fade">
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.flexContainer}
                >
                    <TouchableWithoutFeedback onPress={() => setIpModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>{t('serverIp')}</Text>
                                    
                                    <Text style={[styles.description, { color: COLORS.secondaryText }]}>
                                        {t('serverIpDescription')}
                                    </Text>
                                    
                                    <TextInput
                                        style={[
                                            styles.input, 
                                            { 
                                                color: COLORS.inputText,
                                                backgroundColor: COLORS.inputBg,
                                                borderColor: isValidIp ? COLORS.accentGreen : COLORS.inputBorder
                                            }
                                        ]}
                                        value={tempIp}
                                        onChangeText={setTempIp}
                                        placeholder="192.168.1.100:5000"
                                        placeholderTextColor={COLORS.secondaryText}
                                        keyboardType="numbers-and-punctuation"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    
                                    {!isValidIp && tempIp.length > 0 && (
                                        <Text style={styles.errorText}>
                                            {t('invalidIpFormat')}
                                        </Text>
                                    )}
                                    
                                    <View style={styles.modalButtons}>
                                        <TouchableOpacity 
                                            onPress={() => {
                                                setTempIp(settings.serverIp || '');
                                                setIpModalVisible(false);
                                            }} 
                                            style={styles.modalButton}
                                        >
                                            <Text style={[styles.modalButtonText, { color: COLORS.secondaryText }]}>
                                                {t('cancel')}
                                            </Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity 
                                            onPress={handleSaveIp} 
                                            style={styles.modalButton}
                                            disabled={!isValidIp}
                                        >
                                            <Text style={[
                                                styles.modalButtonText, 
                                                { 
                                                    color: isValidIp ? COLORS.accentBlue : COLORS.secondaryText,
                                                    opacity: isValidIp ? 1 : 0.5
                                                }
                                            ]}>
                                                {t('save')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

const createStyles = (COLORS, FONTS, SPACING, SHADOWS, width) => StyleSheet.create({
    flexContainer: { flex: 1, backgroundColor: COLORS.background },
    darkBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.background },
    gradientBackground: { ...StyleSheet.absoluteFillObject },
    scrollContent: { flexGrow: 1, alignItems: 'center', paddingVertical: SPACING.xl },
    settingsContainer: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        padding: SPACING.md,
        width: width * 0.9,
        ...SHADOWS.card,
        borderWidth: 1,
        borderColor: COLORS.cardBorder,
    },
    title: {
        fontSize: FONTS.h1,
        fontWeight: '700',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SPACING.lg,
        ...SHADOWS.text,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.cardBorder,
    },
    settingLabelGroup: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8,
        flex: 1,
        marginRight: SPACING.sm
    },
    settingLabel: { 
        fontSize: FONTS.body, 
        color: COLORS.text, 
        marginLeft: 8,
        flexShrink: 1
    },
    languageDisplay: { 
        flexDirection: 'row', 
        alignItems: 'center',
        maxWidth: '50%'
    },
    languageText: { 
        color: COLORS.text, 
        marginRight: 4, 
        fontWeight: '600',
        maxWidth: '90%'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: COLORS.modalBg,
        borderRadius: 20,
        padding: SPACING.lg,
        width: width * 0.85,
        ...SHADOWS.modal,
        borderWidth: 1,
        borderColor: COLORS.modalBorder,
    },
    modalTitle: {
        fontSize: FONTS.body + 4,
        fontWeight: '700',
        color: COLORS.modalText,
        marginBottom: SPACING.sm,
        textAlign: 'center'
    },
    languageOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    languageOptionText: { 
        fontSize: FONTS.body, 
        color: COLORS.modalText 
    },
    modalCloseButton: { 
        marginTop: SPACING.md 
    },
    modalCloseButtonText: {
        fontSize: FONTS.small,
        color: COLORS.accentBlue,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    // Styles pour la configuration IP
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: SPACING.sm,
        marginVertical: SPACING.md,
        fontSize: FONTS.body,
    },
    description: {
        fontSize: FONTS.small,
        marginBottom: SPACING.xs,
        textAlign: 'center'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: SPACING.sm
    },
    modalButton: {
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md
    },
    modalButtonText: {
        fontSize: FONTS.body,
        fontWeight: '600'
    },
    errorText: {
        color: '#ff5252',
        fontSize: FONTS.small,
        marginTop: -SPACING.sm,
        marginBottom: SPACING.sm
    }
});