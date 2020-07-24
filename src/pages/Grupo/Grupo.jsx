import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import api from '../../utils/api';
import StatusBar from '../../components/StatusBar';
import Lista from './Lista';
import styles from '../Home/styles';

const Grupo = ({ gruposId, grupoNome }) => {
  const [itens, setItens] = useState();

  const buscarItens = async () => {
    const { data } = await api.getItens(gruposId);

    setItens(data);
  };

  const removeItem = async (itemId) => {
    try {
      await api.removeIten(itemId);
      setItens(itens.filter((item) => item.id !== itemId));
    } catch (error) {
      console.warn('Deu ruim');
    }
  };

  useEffect(() => {
    buscarItens();
  }, []);

  return (
    <View>
      <StatusBar />
      <View style={styles.container}>
        <Lista
          titulo={grupoNome}
          itens={itens}
          buscarItens={buscarItens}
          removeItem={removeItem}
        />
      </View>
    </View>
  );
};

export default Grupo;
