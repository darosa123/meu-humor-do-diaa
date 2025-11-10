import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

const fileUri = FileSystem.documentDirectory + 'dados.json';

// Função para carregar os registros do arquivo
export const carregarDados = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const jsonString = await FileSystem.readAsStringAsync(fileUri, { encoding: 'utf8' });
      return JSON.parse(jsonString);
    }
  } catch (e) {
    console.error("Erro ao carregar dados:", e);
    Alert.alert("Erro", "Falha ao carregar os dados do arquivo.");
  }
  return [];
};

// Função para salvar os registros no arquivo
export const salvarDados = async (registros) => {
  try {
    const jsonString = JSON.stringify(registros, null, 2);
    await FileSystem.writeAsStringAsync(fileUri, jsonString, { encoding: 'utf8' });
  } catch (e) {
    console.error("Erro ao salvar dados:", e);
    Alert.alert("Erro", "Falha ao salvar os dados no arquivo.");
  }
};

export { fileUri };