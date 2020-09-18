import React, { useEffect ,useState } from 'react';
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

  const criarGrupo = async () => {
    try {
      const { id } = await getUsuarioId();

      await api.novoGrupo({
        usuarioId: id,
        adm: id,
        nome
      });

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
              placeholder="Qual o nome do grupo?"
              placeholderTextColor="#999"
              selectionColor="#999"
              autoCorrect={false}
              onChangeText={(nome) => setNome(nome)}
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
                }}
              >
                <Text style={styles.textStyle}>Depois</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: colors.success }}
                onPress={() => {
                  criarGrupo();
                  setModalVisible(!modalVisible);
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