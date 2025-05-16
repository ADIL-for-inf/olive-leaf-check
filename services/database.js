import * as SQLite from 'expo-sqlite';

// Initialisation avec vérification de compatibilité
const db = SQLite.openDatabase('olivier-detections.db');

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS detections (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          imageUri TEXT NOT NULL,
          result TEXT NOT NULL,
          date TEXT NOT NULL
        );`,
        [],
        () => {
          console.log('Table créée avec succès');
          resolve();
        },
        (_, error) => {
          console.error('Erreur création table:', error);
          reject(error);
          return true; // Arrête la transaction en cas d'erreur
        }
      );
    });
  });
};

export const initDB = async () => {
  try {
    await initializeDatabase();
  } catch (error) {
    console.error('Erreur initialisation DB:', error);
    throw error;
  }
};

export const insertDetection = (imageUri, result, date) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO detections (imageUri, result, date) VALUES (?, ?, ?)',
        [imageUri, result, date],
        (_, resultSet) => resolve(resultSet),
        (_, error) => {
          console.error('Erreur insertion:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const fetchHistory = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM detections ORDER BY date DESC',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          console.error('Erreur récupération historique:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};