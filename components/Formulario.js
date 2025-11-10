import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Formulario({ onSave, onCancel, registroEmEdicao }) {
  const [felicidade, setFelicidade] = useState('');
  const [estresse, setEstresse] = useState('');
  const [sono, setSono] = useState('');

  useEffect(() => {
    if (registroEmEdicao) {
      setFelicidade(String(registroEmEdicao.felicidade));
      setEstresse(String(registroEmEdicao.estresse));
      setSono(String(registroEmEdicao.sono));
    } else {
      setFelicidade('');
      setEstresse('');
      setSono('');
    }
  }, [registroEmEdicao]);

  const handleSaveClick = () => {
    onSave(felicidade, estresse, sono);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>
        {registroEmEdicao ? 'Editando Registro 📝' : 'Novo Registro 😄'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nível de Felicidade (0 a 10)"
        keyboardType="numeric"
        value={felicidade}
        onChangeText={setFelicidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Nível de Estresse (0 a 10)"
        keyboardType="numeric"
        value={estresse}
        onChangeText={setEstresse}
      />
      <TextInput
        style={styles.input}
        placeholder="Horas de Sono"
        keyboardType="numeric"
        value={sono}
        onChangeText={setSono}
      />

      <TouchableOpacity style={styles.botao} onPress={handleSaveClick}>
        <Text style={styles.botaoTexto}>
          {registroEmEdicao ? 'Atualizar Registro' : 'Salvar Registro'}
        </Text>
      </TouchableOpacity>

      {registroEmEdicao && (
        <TouchableOpacity style={styles.botaoCancelar} onPress={onCancel}>
          <Text style={styles.botaoTexto}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
  },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  botao: { backgroundColor: '#27ae60', padding: 12, borderRadius: 5, alignItems: 'center' },
  botaoTexto: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  botaoCancelar: { backgroundColor: '#7f8c8d', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
});
