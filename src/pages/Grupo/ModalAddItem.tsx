import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './stylesModal';
import styleGlobal from '../styles';
import colors from '../../utils/colors';
import api from '../../utils/api';

type Props = {
    gruposId: string,
    buscarItens: () => void,
}

type Item = {
    gruposId: string,
    nome: string,
    descricao: string,
    quantidade: string,
    valor: string,
}

const ModalAddItem = ({ gruposId, buscarItens }: Props) => {
  const defaultValues = {
    gruposId,
    nome: '',
    descricao: '',
    quantidade: '0',
    valor: '0',
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [item, setItem] = useState < Item > (defaultValues);

  const resetConfig = () => {
    setErrorInput(false);
    setItem(defaultValues);
  }

  const criarItem = async () => {
      try {
          if (!item.nome || item.nome === ' ') {
            setErrorInput(true);
            setItem(s => ({ ...s, nome: '' }));
            return;
          }

          if (!item.gruposId) {
            throw 'Não encontrei o id do grupo';
          }

          await api.novoItem(item);
          setModalVisible(!modalVisible);
          buscarItens();
          resetConfig();
      } catch (error) {
          console.warn(error.response);
      }
  }

  return (
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
              <Text style={styles.modalText}>Criar novo item</Text>

              <TextInput
                style={styleGlobal.input}
                defaultValue={item.nome}
                placeholder={errorInput ? 'Nome do item é obrigatório' : 'Nome do item'}
                placeholderTextColor={errorInput ? colors.danger : '#999'}
                selectionColor={errorInput ? colors.danger : '#999'}
                autoCorrect
                onChangeText={(nome) => setItem((s) => ({ ...s, nome: nome.replace(/\s+/g, ' ') }))}
              />
              <TextInput
                style={styleGlobal.input}
                placeholder="Observação"
                placeholderTextColor="#999"
                selectionColor="#999"
                autoCorrect
                onChangeText={(descricao) => setItem((s) => ({ ...s, descricao }))}
              />

                <View style={{
                  top: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                >
                  <TextInput
                    style={styleGlobal.inputNumber}
                    placeholder="Quantidade"
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                    selectionColor="#999"
                    onChangeText={(quantidade) => setItem((s) => ({
                      ...s,
                      quantidade: quantidade.replace(/\,+/g, '')
                    }))}
                  />
                  <TextInput
                    style={styleGlobal.inputNumber}
                    placeholder="Valor"
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                    selectionColor="#999"
                    onChangeText={(valor) => setItem((s) => ({
                      ...s,
                      valor: valor.replace(',', '.')
                    }))}
                  />
                </View>

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
                    criarItem();
                  }}
                >
                  <Text style={styles.textStyle}>Criar agora</Text>
                </TouchableHighlight>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Feather name="plus" size={16} color="#fff" />
      </TouchableHighlight>
    </View>
  );
};

export default ModalAddItem;
