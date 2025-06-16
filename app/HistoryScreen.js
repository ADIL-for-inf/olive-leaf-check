import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  RefreshControl,
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import CustomStatusBar from '../components/CustomStatusBar';

const HistoryScreen = () => {
  // Hooks et contexte
  const { t } = useTranslation();
  const { settings, COLORS, SHADOWS } = useAppContext();
  const navigation = useNavigation();
  
  // États
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement initial
  useEffect(() => {
    loadHistory();
  }, []);

  // Charger l'historique
  const loadHistory = async () => {
    setRefreshing(true);
    try {
      const storedHistory = await AsyncStorage.getItem('history');
      
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        const transformedHistory = parsedHistory.map(transformHistoryItem);
        setHistory(transformedHistory);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error('Loading error:', error);
      Alert.alert(t('error'), t('historyLoadError'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Transformer les items d'historique
  const transformHistoryItem = (item) => {
    return {
      ...item,
      result: {
        maladie: item.result?.disease || item.result?.maladie,
        probabilite: item.result?.confidence || item.result?.probabilite,
        date: item.result?.date || item.date || new Date().toISOString(),
        traitement: item.result?.traitement,
        recommendations: item.result?.recommendations
      }
    };
  };

  // Formatage de date
  const formatDate = (dateString) => {
    if (!dateString) return t('unknownDate');
    
    try {
      const date = new Date(dateString);
      const localeMap = {
        fr: 'fr-FR',
        ar: 'ar-AR',
        en: 'en-US'
      };
      const locale = localeMap[settings.language] || 'fr-FR';
      
      return date.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString;
    }
  };

  // Gestion du mode édition
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedIds([]);
  };

  // Sélection/désélection d'item
  const toggleSelectItem = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  // Confirmation de suppression
  const confirmDelete = () => {
    Alert.alert(
      t('confirmDeleteTitle'),
      t('confirmDeleteMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('delete'), 
          onPress: handleDelete,
          style: 'destructive'
        }
      ]
    );
  };

  // Suppression effective
  const handleDelete = async () => {
    try {
      const updatedHistory = history.filter(item => !selectedIds.includes(item.id));
      await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      setEditMode(false);
      setSelectedIds([]);
    } catch (error) {
      console.error('Deletion error:', error);
      Alert.alert(t('error'), t('historyDeleteError'));
    }
  };

  // Composant d'item d'historique
  const HistoryItem = ({ item }) => {
    const maladie = item.result?.maladie || item.result?.disease;
    const probabilite = item.result?.probabilite || item.result?.confidence;
    const itemDate = item.result?.date;

    return (
      <TouchableOpacity
        onPress={() => editMode 
          ? toggleSelectItem(item.id) 
          : navigation.navigate('DetectionDetails', { item })
        }
        style={[styles.card, { 
          backgroundColor: COLORS.cardBg, 
          ...SHADOWS.card 
        }]}
      >
        {editMode && (
          <View style={[
            styles.checkbox,
            selectedIds.includes(item.id) && styles.checked,
            { borderColor: COLORS.accentBlue }
          ]}>
            {selectedIds.includes(item.id) && (
              <Ionicons name="checkmark" size={18} color="white" />
            )}
          </View>
        )}
        
        <Image 
          source={{ uri: item.imageUri }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.cardContent}>
          <Text style={[styles.title, { color: maladie ? COLORS.text : COLORS.danger }]}>
            {maladie 
              ? t(`diseases.${maladie}`, { defaultValue: maladie }) 
              : t('unknownDisease')
            }
          </Text>
          
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={14} color={COLORS.secondaryText} />
            <Text style={[styles.detailText, { color: COLORS.secondaryText }]}>
              {itemDate ? formatDate(itemDate) : t('unknownDate')}
            </Text>
          </View>

          <View style={[
            styles.statusBadge, 
            { 
              backgroundColor: probabilite 
                ? COLORS.lightBlue 
                : COLORS.lightYellow 
            }]}
          >
            <Text style={[
              styles.statusText, 
              { 
                color: probabilite 
                  ? COLORS.accentBlue 
                  : COLORS.accentYellow 
              }]}
            >
              {probabilite 
                ? `${probabilite}% ${t('confidence')}`
                : t('unknownConfidence')
              }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Écrans d'état
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: COLORS.background }]}>
        <ActivityIndicator size="large" color={COLORS.accentBlue} />
        <Text style={[styles.loadingText, { color: COLORS.secondaryText }]}>
          {t('loadingHistory')}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <CustomStatusBar />
      
      {/* En-tête centré */}
      <View style={styles.headerContainer}>
        <View style={styles.headerCenter}>
          <Text style={[styles.header, { color: COLORS.text }]}>
            {t('historyTitle')}
          </Text>
        </View>
        
        <TouchableOpacity 
          onPress={toggleEditMode}
          style={styles.editButton}
        >
          <Text style={{ color: COLORS.accentBlue, fontWeight: '500' }}>
            {editMode ? t('cancel') : t('edit')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Liste principale */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HistoryItem item={item} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadHistory}
            colors={[COLORS.accentBlue]}
            tintColor={COLORS.accentBlue}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={48} color={COLORS.accentBlue} />
            <Text style={[styles.emptyText, { color: COLORS.secondaryText }]}>
              {t('noHistory')}
            </Text>
            <Text style={[styles.emptySubtext, { color: COLORS.secondaryText }]}>
              {t('historyEmptySubtext')}
            </Text>
          </View>
        }
      />

      {/* Bouton de suppression flottant */}
      {editMode && selectedIds.length > 0 && (
        <View style={styles.deleteContainer}>
          <TouchableOpacity 
            style={[styles.deleteButton, { backgroundColor: COLORS.danger }]} 
            onPress={confirmDelete}
          >
            <Ionicons name="trash" size={24} color="white" />
            <Text style={styles.deleteText}>
              {t('delete')} ({selectedIds.length})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative'
  },
  headerCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center'
  },
  editButton: {
    marginLeft: 'auto'
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500'
  },
  checkbox: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  checked: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4'
  },
  deleteContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  deleteText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 16
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 60
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '500'
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16
  },
  listContent: {
    paddingBottom: 20
  }
});

export default HistoryScreen;