import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import * as Database from './services/Database';
import Formulario from './components/Formulario';
import ListaRegistros from './components/ListaRegistros';

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [registroEmEdicao, setRegistroEmEdicao] = useState(null);

  useEffect(() => {
    const init = async () => {
      const dados = await Database.carregarDados();
      setRegistros(dados);
      setCarregando(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!carregando) Database.salvarDados(registros);
  }, [registros, carregando]);

  const handleSave = (felicidade, estresse, sono) => {
    const f = parseFloat(felicidade);
    const e = parseFloat(estresse);
    const s = parseFloat(sono);

    if ([f, e, s].some(isNaN)) {
      return Alert.alert('Erro', 'Por favor, preencha todos os campos com números válidos!');
    }

    if (registroEmEdicao) {
      const atualizado = registros.map(r => r.id === registroEmEdicao.id ? { ...r, felicidade: f, estresse: e, sono: s } : r);
      setRegistros(atualizado);
      Alert.alert('Sucesso!', 'Registro atualizado!');
    } else {
      const novo = { id: new Date().getTime(), data: new Date().toLocaleDateString('pt-BR'), felicidade: f, estresse: e, sono: s };
      setRegistros([...registros, novo]);
      Alert.alert('Sucesso!', 'Registro salvo!');
    }
    setRegistroEmEdicao(null);
  };

  const handleDelete = (id) => {
    setRegistros(registros.filter(r => r.id !== id));
    Alert.alert('Sucesso!', 'Registro deletado!');
  };

  const handleEdit = (registro) => setRegistroEmEdicao(registro);
  const handleCancel = () => setRegistroEmEdicao(null);

  const exportarDados = async () => {
    const jsonString = JSON.stringify(registros, null, 2);
    if (Platform.OS === 'web') {
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'meu-humor.json'; a.click();
      URL.revokeObjectURL(url);
    } else {
      const fileUri = FileSystem.documentDirectory + 'meu-humor.json';
      await FileSystem.writeAsStringAsync(fileUri, jsonString);
      await Sharing.shareAsync(fileUri);
    }
  };

  if (carregando) return <View style={styles.loading}><ActivityIndicator size="large" color="#2980b9" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>😄 Meu Humor do Dia</Text>
        <Formulario onSave={handleSave} onCancel={handleCancel} registroEmEdicao={registroEmEdicao} />
        <ListaRegistros registros={registros} onEdit={handleEdit} onDelete={handleDelete} />
        <View style={styles.card}>
          <Text style={styles.subtitulo}>Exportar Registros</Text>
          <TouchableOpacity style={styles.botaoExportar} onPress={exportarDados}>
            <Text style={styles.botaoTexto}>📤 Exportar arquivo JSON</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecf0f1', paddingTop: Platform.OS === 'android' ? 25 : 0 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#2980b9' },
  card: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, elevation: 3 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#2c3e50' },
  botaoExportar: { backgroundColor: '#3498db', padding: 12, borderRadius: 6, alignItems: 'center' },
  botaoTexto: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
