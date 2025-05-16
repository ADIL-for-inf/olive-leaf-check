import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  RefreshControl,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigation = useNavigation();

  const COLORS = {
    primary: '#2A2D3F',
    secondary: '#4ECDC4',
    danger: '#FF6B6B',
    background: '#F8F9FA',
    text: '#2A2D3F',
    border: '#E0E0E0'
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('history');
      setHistory(storedHistory ? JSON.parse(storedHistory) : []);
    } catch (error) {
      console.error('Erreur de chargement:', error);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedIds([]);
  };

  const toggleSelectItem = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer les éléments sélectionnés ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: handleDelete }
      ]
    );
  };

  const handleDelete = async () => {
    try {
      const updatedHistory = history.filter(item => !selectedIds.includes(item.id));
      await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      setEditMode(false);
      setSelectedIds([]);
    } catch (error) {
      console.error('Erreur de suppression:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => editMode ? toggleSelectItem(item.id) : navigation.navigate('DetectionDetails', item)}
      style={styles.card}
    >
      {editMode && (
        <View style={[
          styles.checkbox,
          selectedIds.includes(item.id) && styles.checked
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
        <Text style={styles.title}>{item.result.maladie}</Text>
        
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={14} color={COLORS.text} />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.result.probabilite}% de confiance</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Historique des Analyses</Text>
        <TouchableOpacity onPress={toggleEditMode}>
          <Text style={styles.editButton}>
            {editMode ? 'Annuler' : 'Modifier'}
          </Text>
        </TouchableOpacity>
      </View>

      {editMode && selectedIds.length > 0 && (
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={confirmDelete}
        >
          <Ionicons name="trash" size={24} color="white" />
          <Text style={styles.deleteText}>Supprimer ({selectedIds.length})</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadHistory}
            colors={[COLORS.secondary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={48} color={COLORS.secondary} />
            <Text style={styles.emptyText}>Aucune analyse disponible</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2A2D3F'
  },
  editButton: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '500'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  cardContent: {
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A2D3F',
    marginBottom: 8
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  detailText: {
    fontSize: 14,
    color: '#6C757D',
    marginLeft: 8
  },
  statusBadge: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  statusText: {
    color: '#2196F3',
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
    borderColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  checked: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4'
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  deleteText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500'
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
    color: '#6C757D',
    marginTop: 16,
    textAlign: 'center'
  }
});

export default HistoryScreen;