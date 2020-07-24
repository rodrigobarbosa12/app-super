import React, { useState } from 'react';
import {
  StyleSheet, Picker, Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { themeDefault } from '../../utils/colors';
import AnimatedView from '../../components/AnimatedView';
import { HARARIOS } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputNome: {
    backgroundColor: 'transparent',
  },
  funcionamento: {
    borderRadius: 1,
    borderBottomWidth: 1,
    borderColor: '#999',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  picker: {
    color: '#999',
    height: 50,
    width: 110,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: themeDefault.purple,
  },
});

const EtapaCadastroStudio = ({
  etapas,
  setEtapas,
  setFieldValue,
  errors,
}) => {
  const [inicial, setInicial] = useState('09:00');
  const [final, setFinal] = useState('18:00');

  return (
    <>
      <AnimatedView duration={1000}>
        <TextInput
          style={styles.inputNome}
          placeholder="Razão social"
          placeholderTextColor="#999"
          autoCorrect={false}
          error={errors.razaoSocial}
          label={errors.razaoSocial && errors.razaoSocial}
          onChangeText={(text) => setFieldValue('razaoSocial', text)}
        />
        <TextInput
          style={styles.inputNome}
          placeholder="Fantasia"
          placeholderTextColor="#999"
          autoCorrect={false}
          error={errors.fantasia}
          label={errors.fantasia && errors.fantasia}
          onChangeText={(text) => setFieldValue('fantasia', text)}
        />
        <TextInput
          style={styles.inputNome}
          placeholder="Cnpj"
          placeholderTextColor="#999"
          autoCorrect={false}
          error={errors.documento}
          label={errors.documento && errors.documento}
          onChangeText={(text) => setFieldValue('documento', text)}
        />

        <Text style={{
          color: '#999',
          top: 10,
          left: 14,
          marginBottom: 10,
          fontSize: 16,
        }}
        >
            Funcionamento
        </Text>

        <View style={styles.funcionamento}>

          <Text style={{ color: '#999', top: 15, fontSize: 16 }}>
            Das
          </Text>

          <Picker
            style={styles.picker}
            selectedValue={inicial}
            mode="dropdown"
            onValueChange={(itemValue) => setInicial(itemValue)}
          >
            {HARARIOS.map((horario) => (
              <Picker.Item
                key={horario}
                label={horario}
                value={horario}
                color="#999"
              />
            ))}
          </Picker>

          <Text style={{ color: '#999', top: 15, fontSize: 16 }}>
            Às
          </Text>

          <Picker
            style={styles.picker}
            selectedValue={final}
            mode="dropdown"
            onValueChange={(itemValue) => setFinal(itemValue)}
          >
            {HARARIOS.map((horario) => (
              <Picker.Item
                key={horario}
                label={horario}
                value={horario}
                color="#999"
              />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.inputNome}
          placeholder="Contato"
          placeholderTextColor="#999"
          autoCorrect={false}
        />
      </AnimatedView>
      <View style={styles.action}>
        <TouchableOpacity
          onPress={() => setEtapas(etapas + 1)}
          style={styles.button}
        >
          <Icon
            name="arrow-right"
            size={20}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EtapaCadastroStudio;
