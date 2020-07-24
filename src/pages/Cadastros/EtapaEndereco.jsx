import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Picker,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import AnimatedView from '../../components/AnimatedView';
import { ESTADOS_BRASILEIROS } from '../../utils/constants';
import Actions from './Actions';

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    backgroundColor: 'transparent',
  },
  inputLogradouro: {
    backgroundColor: 'transparent',
    width: 220,
    right: 10,
  },
  imputNumero: {
    backgroundColor: 'transparent',
    width: 60,
    left: 10,
  },
  imputComplemento: {
    backgroundColor: 'transparent',
    width: 140,
    right: 10,
  },
  imputBairro: {
    backgroundColor: 'transparent',
    width: 140,
    left: 10,
  },
  imputCidade: {
    backgroundColor: 'transparent',
    width: 200,
    right: 10,
  },
  imputEstado: {
    backgroundColor: 'transparent',
    width: 60,
  },
  picker: {
    top: 15,
    left: 10,
    height: 50,
    width: 90,
  },
});

const EtapaEnderaco = ({
  etapas,
  setEtapas,
  handleSubmit,
  setFieldValue,
  errors,
}) => {
  const [estados, setStatdos] = useState('SP');
  return (
    <>
      <AnimatedView duration={1000}>
        <TextInput
          style={styles.input}
          placeholder="Cep:"
          placeholderTextColor="#999"
          autoCorrect={false}
          error={errors.cep}
          label={errors.cep && errors.cep}
          onChangeText={(cep) => setFieldValue('cep', cep)}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputLogradouro}
            placeholder="Logradouro"
            placeholderTextColor="#999"
            autoCorrect={false}
            error={errors.logradouro}
            label={errors.logradouro && errors.logradouro}
            onChangeText={(logradouro) => setFieldValue('logradouro', logradouro)}
          />
          <TextInput
            style={styles.imputNumero}
            placeholder="Nº"
            placeholderTextColor="#999"
            autoCorrect={false}
            error={errors.numero}
            label={errors.numero && errors.numero}
            onChangeText={(numero) => setFieldValue('numero', numero)}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.imputComplemento}
            placeholder="Complemento"
            placeholderTextColor="#999"
            autoCorrect={false}
            onChangeText={(complemento) => setFieldValue('complemento', complemento)}
          />
          <TextInput
            style={styles.imputBairro}
            placeholder="Barirro"
            placeholderTextColor="#999"
            autoCorrect={false}
            error={errors.bairro}
            label={errors.bairro && errors.bairro}
            onChangeText={(bairro) => setFieldValue('bairro', bairro)}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.imputCidade}
            placeholder="Cidade"
            placeholderTextColor="#999"
            autoCorrect={false}
            error={errors.cidade}
            label={errors.cidade && errors.cidade}
            onChangeText={(cidade) => setFieldValue('cidade', cidade)}
          />
          <Picker
            style={styles.picker}
            selectedValue={estados}
            mode="dropdown"
            onValueChange={(estado) => {
              setStatdos(estado);
              setFieldValue('estado', estado);
            }}
          >
            {ESTADOS_BRASILEIROS.map((estado) => (
              <Picker.Item
                key={estado}
                label={estado}
                value={estado}
                color="#999"
              />
            ))}
          </Picker>
        </View>
      </AnimatedView>
      <Actions
        etapas={etapas}
        setEtapas={setEtapas}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default EtapaEnderaco;
