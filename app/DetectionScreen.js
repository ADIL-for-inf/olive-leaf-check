import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const DetectionScreen = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const navigation = useNavigation();

  // Thème professionnel
  const theme = {
    colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      danger: '#e74c3c',
      warning: '#f39c12',
      light: '#ecf0f1',
      dark: '#2c3e50',
      white: '#ffffff'
    },
    spacing: {
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    }
  };

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
            'Permission requise',
            'Nous avons besoin d\'accéder à votre caméra',
            [
              { text: 'Annuler' },
              { text: 'Paramètres', onPress: () => Linking.openSettings() }
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
            'Permission requise',
            'Nous avons besoin d\'accéder à vos photos',
            [
              { text: 'Annuler' },
              { text: 'Paramètres', onPress: () => Linking.openSettings() }
            ]
          );
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync(options);
        handleImageResult(result);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Erreur', 'Une erreur est survenue');
    }
  };

  const handleImageResult = (result) => {
    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
      setAnalysisResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      Alert.alert('Erreur', 'Veuillez sélectionner une image');
      return;
    }

    setLoading(true);

    // Simulation d'analyse avec délai
    await new Promise(resolve => setTimeout(resolve, 2500));

    try {
      const severity = Math.floor(Math.random() * 100);
      const disease = getRandomDisease();
      
      setAnalysisResult({
        disease,
        severity,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        treatment: generateTreatment(disease, severity),
        date: new Date().toLocaleString(),
        recommendations: generateRecommendations(disease)
      });
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert('Erreur', 'Échec de l\'analyse');
    } finally {
      setLoading(false);
    }
  };

  // Fonctions helpers pour générer des données réalistes
  const getRandomDisease = () => {
    const diseases = [
      "Xylella Fastidiosa",
      "Mildiou de l'olivier",
      "Oeil de paon",
      "Pourridié",
      "Chancre bactérien"
    ];
    return diseases[Math.floor(Math.random() * diseases.length)];
  };

  const generateTreatment = (disease, severity) => {
    if (severity > 75) {
      return `Traitement urgent requis pour ${disease}. Consultez un expert.`;
    } else if (severity > 40) {
      return `Traitement recommandé pour ${disease}. Produits spécifiques nécessaires.`;
    }
    return `Surveillance recommandée pour ${disease}. Aucun traitement immédiat.`;
  };

  const generateRecommendations = (disease) => {
    const baseRecommendations = [
      "Isoler les plantes infectées",
      "Désinfecter les outils après usage",
      "Éviter l'excès d'humidité",
      "Contrôler régulièrement les plantes voisines"
    ];
    
    // Ajouter des recommandations spécifiques
    if (disease === "Xylella Fastidiosa") {
      baseRecommendations.push("Élimination des plantes infectées obligatoire");
      baseRecommendations.push("Signalement aux autorités phytosanitaires");
    }
    
    return baseRecommendations;
  };

  const saveToHistory = async () => {
    if (!image || !analysisResult) return;

    try {
      const history = JSON.parse(await AsyncStorage.getItem('history') || '[]');
      
      history.unshift({
        id: Date.now(),
        imageUri: image,
        result: analysisResult
      });

      await AsyncStorage.setItem('history', JSON.stringify(history));
      
      Alert.alert(
        'Succès', 
        'Analyse sauvegardée',
        [
          { 
            text: 'Voir historique', 
            onPress: () => navigation.navigate('historique') 
          },
          { 
            text: 'Continuer', 
            style: 'cancel' 
          }
        ]
      );
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Erreur', 'Échec de la sauvegarde');
    }
  };

  const getSeverityColor = (severity) => {
    if (severity > 75) return theme.colors.danger;
    if (severity > 40) return theme.colors.warning;
    return theme.colors.secondary;
  };

  return (
    <LinearGradient
    colors={['#3498db', '#4ECDC4','#2ecc71']} // Bleu -> Turquoise -> Vert
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}
  >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Analyse en cours...</Text>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.title}>Diagnostic des Plantes</Text>
          <Text style={[styles.subtitle, { color: '#ffffff' }]}>Détectez les maladies de vos oliviers</Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => pickImage('camera')}
            style={[styles.button, { backgroundColor: theme.colors.dark }]}
          >
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.buttonText}>Prendre une photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickImage('gallery')}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
          >
            <Ionicons name="images" size={24} color="white" />
            <Text style={styles.buttonText}>Choisir une image</Text>
          </TouchableOpacity>
        </View>

        {image && (
          <View style={styles.imageSection}>
            <View style={styles.imageContainer}>
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
              >
                <Ionicons name="analytics" size={24} color="white" />
                <Text style={styles.buttonText}>Lancer l'analyse</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.resultsContainer}>
                <Text style={styles.resultsTitle}>Résultats d'Analyse</Text>
                
                <View style={styles.resultCard}>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Maladie:</Text>
                    <Text style={styles.resultValue}>{analysisResult.disease}</Text>
                  </View>
                  
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Sévérité:</Text>
                    <View style={[
                      styles.severityBadge,
                      { backgroundColor: getSeverityColor(analysisResult.severity) }
                    ]}>
                      <Text style={styles.severityText}>{analysisResult.severity}%</Text>
                    </View>
                  </View>
                  
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Fiabilité:</Text>
                    <Text style={styles.resultValue}>{analysisResult.confidence}%</Text>
                  </View>
                </View>

                <View style={styles.treatmentCard}>
                  <Text style={styles.sectionTitle}>Traitement recommandé</Text>
                  <Text style={styles.treatmentText}>{analysisResult.treatment}</Text>
                </View>

                <View style={styles.recommendationsCard}>
                  <Text style={styles.sectionTitle}>Recommandations</Text>
                  {analysisResult.recommendations.map((item, index) => (
                    <View key={index} style={styles.recommendationItem}>
                      <Ionicons 
                        name="checkmark-circle" 
                        size={20} 
                        color={theme.colors.secondary} 
                      />
                      <Text style={styles.recommendationText}>{item}</Text>
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
                    <Text style={styles.actionButtonText}>Nouvelle analyse</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={saveToHistory}
                    style={[styles.actionButton, styles.saveButton]}
                  >
                    <Ionicons name="save" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Sauvegarder</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  analyzeButton: {
    backgroundColor: '#3498db',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  imageSection: {
    marginBottom: 24,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 300,
  },
  resultsContainer: {
    marginTop: 24,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  severityBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  severityText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  treatmentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  treatmentText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
  },
  recommendationsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 10,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
});

export default DetectionScreen;