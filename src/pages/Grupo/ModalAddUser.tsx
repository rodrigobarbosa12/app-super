import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './stylesModal';
import api from '../../utils/api';
import colors from '../../utils/colors';

type Props = {
    gruposId: string,
}

const ModalAddUser = ({ gruposId }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [email, setEmail] = useState < string > ('');

  const resetConfig = () => {
    setErrorInput(false);
    setEmail('');
  }

  const adicionarUser = async () => {
      try {
        await api.addUser({
          email,
          gruposId,
        });

        setModalVisible(!modalVisible);
        console.warn(gruposId);
      } catch (error) {
          console.warn(error.response.data.message);
      }
  }

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Adicionar usuário ao grupo</Text>

                <TextInput
                  style={styles.inputText}
                  keyboardType="email-address"
                  defaultValue={email}
                  placeholder={errorInput ? 'Email é obrigatório' : 'Qual o email do usuário?'}
                  placeholderTextColor={errorInput ? colors.danger : '#999'}
                  selectionColor={errorInput ? colors.danger : '#999'}
                  autoCorrect={false}
                  onChangeText={(email) => setEmail(email)}
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
                      adicionarUser();
                    }}
                  >
                    <Text style={styles.textStyle}>Adicionar</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </View>
      <TouchableHighlight
          style={{ marginRight: 20 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Feather name="user-plus" size={20} color="#FFF" />
      </TouchableHighlight>
    </>
  );
};

export default ModalAddUser;
