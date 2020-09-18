import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ap from '../../utils/api';
import styles from './stylesModal';
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
    quantidade: number,
    valor: number,
}

const ModalAdd = ({ gruposId, buscarItens }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState < Item > ({
    gruposId,
    nome: '',
    descricao: '',
    quantidade: 0,
    valor: 0,
  });

  const criarItem = async () => {
      try {
          if (!item.gruposId) {
            throw 'Não encontrei o id do grupo';
          }
          
          console.log(item);
          await api.novoItem(item);
          buscarItens();
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
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Criar novo item</Text>

            <TextInput
              style={styles.inputText}
              placeholder="Produto"
              placeholderTextColor="#999"
              selectionColor="#999"
              autoCorrect={false}
              onChangeText={(nome) => setItem((s) => ({ ...s, nome }))}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Descrição"
              placeholderTextColor="#999"
              selectionColor="#999"
              autoCorrect={false}
              onChangeText={(descricao) => setItem((s) => ({ ...s, descricao }))}
            />
            <View style={{
              top: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            >
              <TextInput
                style={styles.inputNumber}
                placeholder="Quantidade"
                keyboardType="numeric"
                placeholderTextColor="#999"
                selectionColor="#999"
                autoCorrect={false}
                onChangeText={(quantidade) => setItem((s) => ({ ...s, quantidade: Number(quantidade) }))}
              />
              <TextInput
                style={styles.inputNumber}
                placeholder="Valor"
                keyboardType="numeric"
                placeholderTextColor="#999"
                selectionColor="#999"
                autoCorrect={false}
                onChangeText={(valor) => setItem((s) => ({ ...s, valor: Number(valor) }))}
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
                }}
              >
                <Text style={styles.textStyle}>Depois</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: colors.success }}
                onPress={() => {
                  criarItem();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Criar agora</Text>
              </TouchableHighlight>
            </View>
          </View>
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

export default ModalAdd;
