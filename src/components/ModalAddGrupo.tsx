import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';
import styles from '../pages/Grupo/stylesModal';
import colors from '../utils/colors';
import api from '../utils/api';
import identity from '../utils/identity';
import get from 'lodash/get';

type Props = {
    buscarGrupos: () => void,
    modalVisible: boolean,
    setModalVisible: Function,
}

const getUsuarioId = async () => await identity();

const ModalAddGrupo = ({ buscarGrupos, modalVisible, setModalVisible }: Props) => {
  const [nome, setNome] = useState<string>('');
  const [errorInput, setErrorInput] = useState<boolean>(false);

  const resetConfig = () => {
    setErrorInput(false);
    setNome('');
  }

  const criarGrupo = async () => {
    try {
      if (!nome || nome === ' ') {
        setErrorInput(true);
        setNome('');
        return;
      }

      const { id } = await getUsuarioId();

      await api.novoGrupo({
        usuarioId: id,
        adm: id,
        nome
      });

      setModalVisible(!modalVisible);
      resetConfig();
      buscarGrupos();
    } catch (error) {
      Alert.alert(get(error, 'response.data.message', 'Algo deu errado, tento de novo mais tarde'))
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Novo grupo</Text>

            <TextInput
              style={styles.inputText}
              defaultValue={nome}
              placeholder="Qual o nome do grupo?"
              placeholderTextColor={errorInput ? colors.danger : '#999'}
              selectionColor={errorInput ? colors.danger : '#999'}
              autoCorrect={false}
              onChangeText={(nome) => setNome(nome.replace(/\s+/g, ' '))}
            />

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            >
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: colors.metteDanger }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  resetConfig();
                }}
              >
                <Text style={styles.textStyle}>Depois</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: colors.success }}
                onPress={() => {
                  criarGrupo();
                }}
              >
                <Text style={styles.textStyle}>Criar agora</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddGrupo;
