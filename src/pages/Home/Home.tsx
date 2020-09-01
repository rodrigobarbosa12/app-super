import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';
import api from '../../utils/api';
import WarningAlert from '../../components/WarningAlert';
import identity from '../../utils/identity';
import Lista from './Lista';
import styles from './styles';
import { Grupo } from './type';

const Home = () => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [visibilit, setVisibilit] = useState<boolean>(false);
  const [grupoId, setGrupoId] = useState<string>('');

  const buscarGrupos = async () => {
    try {
      const { id } = await identity();
      const { data } = await api.getGrupos(id);
      setGrupos(data);
    } catch (error) {
      console.warn(error);
    }
  };

  const removeGrupo = async () => {
    try {
      await api.removeGrupo(grupoId);
      await setGrupos(grupos.filter((grupo) => grupo.id !== grupoId));
      setVisibilit(false);
    } catch (error) {
      console.warn('Deu ruim');
    }
  };

  const alertRemoveGrupo = (gruposId: string) => {
    setGrupoId(gruposId);
    setVisibilit(true);
  };

  useEffect(() => {
    buscarGrupos();
  }, []);

  return (
    <>
      <View>
        <Header />
        <View style={styles.container}>
          <Lista
            grupos={grupos}
            buscarGrupos={buscarGrupos}
            alertRemoveGrupo={alertRemoveGrupo}
          />
        </View>
      </View>
      <FloatingButton
        buscarGrupos={buscarGrupos}
      />
      <WarningAlert
        title="Atenção"
        message="Todos os itens serão excluidos"
        show={visibilit}
        showConfirmButton
        showCancelButton
        onConfirm={removeGrupo}
        onCalcel={() => setVisibilit(false)}
        cancelText="Depois"
        confirmText="Excluir"
      />
    </>
  );
};

export default Home;
