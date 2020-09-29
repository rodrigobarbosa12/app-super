import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [email, setEmail] = useState < string > ('');

  const resetConfig = () => {
    setModalVisible(!modalVisible);
    setErrorMessage('');
    setEmail('');
  }

  const adicionarUser = async () => {
      try {
        if (!email.match(/[\w.]+@\w+\.\w{2,4}\.?\w{0,2}/ig)) {
          setErrorMessage('Digite um email válido');
          return;
        }

        await api.addUser({
          email,
          gruposId,
        });

        resetConfig();
        console.warn(gruposId);
      } catch (error) {
        setErrorMessage(error.response.data.message);
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
                <Text style={styles.modalText}>Adicionar membro ao grupo</Text>

                <TextInput
                  style={styles.inputText}
                  placeholder={'Qual o email do usuário?'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  defaultValue={email}
                  placeholderTextColor={'#999'}
                  selectionColor={'#999'}
                  onChangeText={(email) => setEmail(email)}
                />

                {!!errorMessage && (
                  <Text style={styles.modalTextError}>
                    {errorMessage}
                  </Text>
                )}

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                >
                  <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: colors.metteDanger }}
                    onPress={() => {
                      resetConfig();
                    }}
                  >
                    <Text style={styles.textStyle}>Depois</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: colors.success }}
                    onPress={() => {
                      adicionarUser();
                    }}
                  >
                    <Text style={styles.textStyle}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Feather name="user-plus" size={30} color="#FFF" />
      </TouchableOpacity>
    </>
  );
};

export default ModalAddUser;
