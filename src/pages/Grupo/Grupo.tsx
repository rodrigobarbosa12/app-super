import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import api from '../../utils/api';
import StatusBar from '../../components/StatusBar';
import WarningAlert from '../../components/WarningAlert';
import Lista from './Lista';
import styles from '../Home/styles';
import { Item } from './type';

type Props = {
  gruposId: string,
  grupoNome: string,
}

const Grupo = ({ gruposId, grupoNome }: Props) => {
  const [itens, setItens] = useState<Item[]>([]);
  const [visibilit, setVisibilit] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>('');

  const buscarItens = async () => {
    try {
      const { data } = await api.getItens(gruposId);
      setItens(data);
    } catch (error) {
      console.warn('Deu ruim ao buscar items');
    }
  };

  const removeItem = async () => {
    try {
      await api.removeIten(itemId);
      setItens(itens.filter((item) => item.id !== itemId));
      setVisibilit(false);
    } catch (error) {
      console.warn('Deu ruim');
    }
  };


  const alertRemoveGrupo = (itemId: string) => {
    setItemId(itemId);
    setVisibilit(true);
  };

  useEffect(() => {
    buscarItens();
  }, []);

  return (
    <>
      <View>
        <StatusBar />
        <View style={styles.container}>
          <Lista
            titulo={grupoNome}
            itens={itens}
            gruposId={gruposId}
            buscarItens={buscarItens}
            alertRemoveGrupo={alertRemoveGrupo}
          />
        </View>
      </View>
        <WarningAlert
          title="Atenção"
          message="Deseja excluir esse item?"
          show={visibilit}
          showConfirmButton
          showCancelButton
          onConfirm={removeItem}
          onCalcel={() => setVisibilit(false)}
          cancelText="Depois"
          confirmText="Excluir"
      />
      </>
  );
};

export default Grupo;
