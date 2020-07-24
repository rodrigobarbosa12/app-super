import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';
import api from '../../utils/api';
import WarningAlert from '../../components/WarningAlert';
import identity from '../../utils/identity';
import Lista from './Lista';
import styles from './styles';

const Home = () => {
  const [grupos, setGrupos] = useState([]);
  const [visibilit, setVisibilit] = useState(false);
  const [grupoId, setGrupoId] = useState('');

  const buscarGrupos = async () => {
    const { id } = await identity();
    const { data } = await api.getGrupos(id);
    setGrupos(data);
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

  const alertRemoveGrupo = (gruposId) => {
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
      <FloatingButton />
      <WarningAlert
        title="Atenção"
        message="Todos os itens serão excluidos"
        visibilit={visibilit}
        onConfirm={removeGrupo}
        onCalcel={() => setVisibilit(false)}
        cancelText="Depois"
        confirmText="Excluir"
      />
    </>
  );
};

export default Home;
