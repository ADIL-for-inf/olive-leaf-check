import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  ScrollView, 
  Linking 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../context/AppContext';
import CustomStatusBar from '../components/CustomStatusBar';

const DetectionScreen = () => {
  const { t } = useTranslation();
  const { settings, COLORS, SHADOWS } = useAppContext();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Utilise l'IP du serveur depuis les paramètres
  const API_URL = `http://${settings.serverIp}/predict`;

  // Gradient selon mode clair/sombre
  const gradientColors = settings.darkMode
    ? ['#121212', '#1e1e1e', '#121212']
    : ['#3498db', '#4ECDC4', '#2ecc71'];

  // Dictionnaire des traitements et recommandations
  const diseaseTreatments = {
    "Mouche de olivier": {
      treatment: t('diseaseTreatments.oliveFly.treatment'),
      recommendations: t('diseaseTreatments.oliveFly.recommendations', { returnObjects: true })
    },
    "Tuberculose": {
      treatment: t('diseaseTreatments.tuberculosis.treatment'),
      recommendations: t('diseaseTreatments.tuberculosis.recommendations', { returnObjects: true })
    },
    "cochenille noire": {
      treatment: t('diseaseTreatments.blackScale.treatment'),
      recommendations: t('diseaseTreatments.blackScale.recommendations', { returnObjects: true })
    },
    "en bonne etat": {
      treatment: t('diseaseTreatments.healthy.treatment'),
      recommendations: t('diseaseTreatments.healthy.recommendations', { returnObjects: true })
    },
    "oeil_de_paon": {
      treatment: t('diseaseTreatments.peacockEye.treatment'),
      recommendations: t('diseaseTreatments.peacockEye.recommendations', { returnObjects: true })
    },
    "psylle": {
      treatment: t('diseaseTreatments.psyllid.treatment'),
      recommendations: t('diseaseTreatments.psyllid.recommendations', { returnObjects: true })
    },
    "default": {
      treatment: t('diseaseTreatments.default.treatment'),
      recommendations: t('diseaseTreatments.default.recommendations', { returnObjects: true })
    },
    "noDetection": {
      treatment: t('noDetection.treatment'),
      recommendations: t('noDetection.recommendations', { returnObjects: true })
    }
  };

  /**
   * Permet à l'utilisateur de choisir une image depuis la galerie ou prendre une photo.
   * @param {'camera'|'gallery'} source
   */
  const pickImage = async (source) => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.9,
        allowsEditing: true,
        aspect: [4, 3],
      };

      if (source === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            t('permissionRequired'),
            t('cameraPermissionMessage'),
            [
              { text: t('cancel') },
              { text: t('settings'), onPress: () => Linking.openSettings() }
            ]
          );
          return;
        }
        const result = await ImagePicker.launchCameraAsync(options);
        handleImageResult(result);
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            t('permissionRequired'),
            t('galleryPermissionMessage'),
            [
              { text: t('cancel') },
              { text: t('settings'), onPress: () => Linking.openSettings() }
            ]
          );
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync(options);
        handleImageResult(result);
      }
    } catch (error) {
      console.error(t('imageSelectionError'), error);
      Alert.alert(t('error'), t('imageSelectionErrorMessage'));
    }
  };

  /**
   * Traite le résultat de la sélection d'image.
   * @param {object} result
   */
  const handleImageResult = (result) => {
    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
      setAnalysisResult(null); // Réinitialise les résultats si nouvelle image
    }
  };

  /**
   * Normalise le nom de la maladie pour correspondre à nos clés.
   * @param {string} disease
   */
  const normalizeDiseaseName = (disease) => {
    if (!disease) return 'default';
    const lower = disease.toLowerCase();
    if (lower.includes('mouche')) return 'Mouche de olivier';
    if (lower.includes('tuberculose')) return 'Tuberculose';
    if (lower.includes('cochenille')) return 'cochenille noire';
    if (lower.includes('bonne') || lower.includes('sain')) return 'en bonne etat';
    if (lower.includes('oeil') || lower.includes('paon')) return 'oeil_de_paon';
    if (lower.includes('psylle')) return 'psylle';
    return 'default';
  };

  /**
   * Envoie l'image au serveur Flask pour analyse.
   */
  const analyzeImage = async () => {
    if (!image) {
      Alert.alert(t('error'), t('selectImageError'));
      return;
    }

    // Vérifie que l'adresse IP est configurée
    if (!settings.serverIp || settings.serverIp.length < 7) {
      Alert.alert(
        t('serverNotConfigured'),
        t('serverNotConfiguredMessage'),
        [
          { text: t('cancel') },
          { 
            text: t('configure'), 
            onPress: () => navigation.navigate('Paramètres')
          }
        ]
      );
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg'
      });

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${t('serverError')}: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      // Cas où aucune détection n'est renvoyée
      if (!result.disease) {
        Alert.alert(t('noDetection.title'), t('noDetection.message'));
        setAnalysisResult({
          disease: 'noDetection',
          severity: 0,
          confidence: 0,
          treatment: diseaseTreatments.noDetection.treatment,
          date: new Date().toLocaleString(),
          recommendations: diseaseTreatments.noDetection.recommendations
        });
        setLoading(false);
        return;
      }

      const normalizedDisease = normalizeDiseaseName(result.disease);
      const diseaseInfo = diseaseTreatments[normalizedDisease] || diseaseTreatments.default;

      setAnalysisResult({
        disease: result.disease,
        severity: result.severity ?? 0,
        confidence: result.confidence ?? 0,
        treatment: diseaseInfo.treatment,
        date: new Date().toLocaleString(),
        recommendations: diseaseInfo.recommendations
      });
    } catch (error) {
      console.error(t('analysisError'), error);
      let errorMessage = t('analysisFailed');
      if (error.name === 'AbortError') {
        errorMessage = t('timeoutError');
      } else if (error.message.includes('Network request failed')) {
        errorMessage = t('serverConnectionError');
      } else if (error.message.includes(t('serverError'))) {
        errorMessage = t('serverErrorMessage');
      }
      Alert.alert(t('error'), errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sauvegarde le résultat dans l'historique local (AsyncStorage).
   */
  const saveToHistory = async () => {
    if (!image || !analysisResult) {
      Alert.alert(t('information'), t('noAnalysisToSave'));
      return;
    }
    try {
      const history = JSON.parse(await AsyncStorage.getItem('history') || '[]');
      history.unshift({
        id: Date.now(),
        imageUri: image,
        result: analysisResult
      });
      await AsyncStorage.setItem('history', JSON.stringify(history));
      Alert.alert(
        t('success'),
        t('analysisSaved'),
        [
          { text: t('viewHistory'), onPress: () => navigation.navigate('Historique') },
          { text: t('continue'), style: 'cancel' }
        ]
      );
    } catch (error) {
      console.error(t('saveError'), error);
      Alert.alert(t('error'), t('saveErrorMessage'));
    }
  };

  /**
   * Détermine la couleur du badge de sévérité.
   * @param {number} severity
   */
  const getSeverityColor = (severity) => {
    if (severity > 75) return COLORS.accentRed;
    if (severity > 40) return COLORS.accentYellow;
    return COLORS.accentGreen;
  };

  return (
    <>
      <CustomStatusBar />
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {loading && (
            <View
              style={[
                styles.loadingOverlay,
                { backgroundColor: settings.darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)' }
              ]}
            >
              <ActivityIndicator size="large" color={COLORS.accentBlue} />
              <Text style={[styles.loadingText, { color: COLORS.text }]}>
                {t('loading')}
              </Text>
              <Text style={[styles.loadingText, { color: COLORS.text, fontSize: 12, marginTop: 10 }]}>
                {t('connectingTo')} {API_URL}
              </Text>
            </View>
          )}

          <View style={styles.header}>
            <Text style={[styles.title, { color: COLORS.text }]}>{t('diagnosticTitle')}</Text>
            <Text style={[styles.subtitle, { color: COLORS.secondaryText }]}>{t('diagnosticSubtitle')}</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={() => pickImage('camera')}
              style={[styles.button, { backgroundColor: COLORS.accentBlue }]}
              disabled={loading}
            >
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.buttonText}>{t('takePhoto')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => pickImage('gallery')}
              style={[styles.button, { backgroundColor: COLORS.accentGreen }]}
              disabled={loading}
            >
              <Ionicons name="images" size={24} color="white" />
              <Text style={styles.buttonText}>{t('chooseImage')}</Text>
            </TouchableOpacity>
          </View>

          {image && (
            <View style={styles.imageSection}>
              <View style={[styles.imageContainer, { backgroundColor: COLORS.cardBg, ...SHADOWS.card }]}>
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>

              {!analysisResult ? (
                <TouchableOpacity
                  onPress={analyzeImage}
                  style={[styles.button, styles.analyzeButton]}
                  disabled={loading}
                >
                  <Ionicons name="analytics" size={24} color="white" />
                  <Text style={styles.buttonText}>{t('startAnalysis')}</Text>
                </TouchableOpacity>
              ) : (
                <>
                  {analysisResult.disease === 'noDetection' ? (
                    <View style={styles.noDetectionContainer}>
                      <Text style={[styles.noDetectionTitle, { color: COLORS.text }]}>
                        {t('noDetection.title')}
                      </Text>
                      <Text style={[styles.noDetectionMessage, { color: COLORS.secondaryText }]}>
                        {t('noDetection.message')}
                      </Text>

                      <View style={[styles.treatmentCard, { backgroundColor: COLORS.cardBg, ...SHADOWS.card }]}>
                        <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t('treatmentPlan')}</Text>
                        <Text style={[styles.treatmentText, { color: COLORS.text }]}>
                          {analysisResult.treatment}
                        </Text>
                      </View>

                      <View style={[styles.recommendationsCard, { backgroundColor: COLORS.cardBg, ...SHADOWS.card }]}>
                        <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t('recommendations')}</Text>
                        {Array.isArray(analysisResult.recommendations) && analysisResult.recommendations.map((item, index) => (
                          <View key={index} style={styles.recommendationItem}>
                            <Ionicons name="checkmark-circle" size={20} color={COLORS.accentGreen} />
                            <Text style={[styles.recommendationText, { color: COLORS.text }]}>{item}</Text>
                          </View>
                        ))}
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          setImage(null);
                          setAnalysisResult(null);
                        }}
                        style={[styles.button, styles.newAnalysisButton]}
                      >
                        <Text style={styles.buttonText}>{t('newAnalysis')}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.resultsContainer}>
                      <Text style={[styles.resultsTitle, { color: COLORS.text }]}>{t('analysisResults')}</Text>

                      <View style={[styles.resultCard, { backgroundColor: COLORS.cardBg, ...SHADOWS.card }]}>
                        <View style={styles.resultRow}>
                          <Text style={[styles.resultLabel, { color: COLORS.secondaryText }]}>{t('detectedDisease')}:</Text>
                          <Text style={[styles.resultValue, { color: COLORS.text }]}>
                            {t(`diseases.${analysisResult.disease}`, { defaultValue: analysisResult.disease })}
                          </Text>
                        </View>

                        {analysisResult.disease !== 'en bonne etat' && (
                          <>
                            <View style={styles.resultRow}>
                              <Text style={[styles.resultLabel, { color: COLORS.secondaryText }]}>{t('severityLevel')}:</Text>
                              <View style={[
                                styles.severityBadge,
                                { backgroundColor: getSeverityColor(analysisResult.severity) }
                              ]}>
                                <Text style={styles.severityText}>{analysisResult.severity}%</Text>
                              </View>
                            </View>
                            <View style={styles.resultRow}>
                              <Text style={[styles.resultLabel, { color: COLORS.secondaryText }]}>{t('reliabilityRate')}:</Text>
                              <Text style={[styles.resultValue, { color: COLORS.text }]}>{analysisResult.confidence}%</Text>
                            </View>
                          </>
                        )}
                      </View>

                      <View style={[styles.treatmentCard, { backgroundColor: COLORS.cardBg, ...SHADOWS.card }]}>
                        <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t('treatmentPlan')}</Text>
                        <Text style={[styles.treatmentText, { color: COLORS.text }]}>{analysisResult.treatment}</Text>
                      </View>

                      <View style={[styles.recommendationsCard, { backgroundColor: COLORS.cardBg, ...SHADOWS.card }]}>
                        <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t('recommendations')}</Text>
                        {Array.isArray(analysisResult.recommendations) && analysisResult.recommendations.map((item, index) => (
                          <View key={index} style={styles.recommendationItem}>
                            <Ionicons name="checkmark-circle" size={20} color={COLORS.accentGreen} />
                            <Text style={[styles.recommendationText, { color: COLORS.text }]}>{item}</Text>
                          </View>
                        ))}
                      </View>

                      <View style={styles.actionButtons}>
                        <TouchableOpacity
                          onPress={() => {
                            setImage(null);
                            setAnalysisResult(null);
                          }}
                          style={[styles.actionButton, styles.newAnalysisButton]}
                        >
                          <Text style={styles.actionButtonText}>{t('newAnalysis')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={saveToHistory}
                          style={[styles.actionButton, styles.saveButton]}
                        >
                          <Ionicons name="save" size={20} color="white" />
                          <Text style={styles.actionButtonText}>{t('save')}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </>
              )}
            </View>
          )}

          {!image && !loading && (
            <View style={styles.placeholderContainer}>
              <Ionicons name="leaf-outline" size={80} color={COLORS.placeholderText} />
              <Text style={[styles.placeholderText, { color: COLORS.placeholderText }]}>
                {t('placeholderText')}
              </Text>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '90%',
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    width: '100%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  analyzeButton: {
    backgroundColor: '#3498db',
    marginTop: 16,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  imageSection: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 4 / 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // Style spécifique pour "no detection"
  noDetectionContainer: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  noDetectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  noDetectionMessage: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  resultsContainer: {
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 0,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 8,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  severityBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
  },
  severityText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  treatmentCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingBottom: 5,
  },
  treatmentText: {
    fontSize: 15,
    lineHeight: 22,
  },
  recommendationsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newAnalysisButton: {
    backgroundColor: '#bdc3c7',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  placeholderContainer: {
    marginTop: 40,
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '80%',
  }
});

export default DetectionScreen;