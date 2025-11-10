import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListaRegistros({ registros, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>Registros Salvos</Text>
      {registros.length > 0 ? [...registros].reverse().map(reg => (
        <View key={reg.id} style={styles.item}>
          <Text style={styles.texto}>
            {reg.data} - Felicidade: {reg.felicidade} 😁 | Estresse: {reg.estresse} 😣 | Sono: {reg.sono}h 😴
          </Text>
          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botaoEditar} onPress={() => onEdit(reg)}>
              <Text style={styles.botaoTexto}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoDelete} onPress={() => onDelete(reg.id)}>
              <Text style={styles.botaoTexto}>❌</Text>
            </TouchableOpacity>
          </View>
        </View>
      )) : (
        <Text style={styles.texto}>Nenhum registro ainda!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, elevation: 3 },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  texto: { fontSize: 16, flex: 1, color: '#34495e' },
  botoes: { flexDirection: 'row', marginLeft: 10 },
  botaoEditar: { backgroundColor: '#f1c40f', borderRadius: 5, padding: 5, marginRight: 5 },
  botaoDelete: { backgroundColor: '#e74c3c', borderRadius: 5, padding: 5 },
  botaoTexto: { color: 'white', fontSize: 16 },
});
