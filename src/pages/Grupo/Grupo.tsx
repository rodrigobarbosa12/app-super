import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import api from '../../utils/api';
import StatusBar from '../../components/StatusBar';
import Lista from './Lista';
import styles from '../Home/styles';
import { Item } from './type';

type Props = {
  gruposId: string,
  grupoNome: string,
}

const Grupo = ({ gruposId, grupoNome }: Props) => {
  const [itens, setItens] = useState<Item[]>([]);

  const buscarItens = async () => {
    try {
      const { data } = await api.getItens(gruposId);
      setItens(data);
    } catch (error) {
      console.warn('Deu ruim ao buscar items');      
    }
  };

  const removeItem = async (itemId: string) => {
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
          gruposId={gruposId}
          buscarItens={buscarItens}
          removeItem={removeItem}
        />
      </View>
    </View>
  );
};

export default Grupo;
