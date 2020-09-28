import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import FadeInView from '../../components/FadeInView';
import StatusBar from '../../components/StatusBar';
import WarningAlert from '../../components/WarningAlert';
import { connect, disconnect, subscribeToNewItem } from '../../utils/socket';
import toRouteAuth from '../../utils/to-route-auth';
import identity from '../../utils/identity';
import api from '../../utils/api';
import Lista from './Lista';
import styles from '../Home/styles';
import { Item } from './type';
import ModalAddUser from './ModalAddUser';
import { Grupo } from '../Home/type';

type Props = {
  grupo: Grupo,
}

const GrupoContainer = ({ grupo }: Props) => {
  const [usuarioLogado, setUsuarioLogado] = useState<string>('');
  const [itens, setItens] = useState<Item[]>([]);
  const [visibilit, setVisibilit] = useState<boolean>(false);
  const [visibilitExitGroup, setVisibilitExitGroup] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>('');

  const buscarItens = async () => {
    try {
      const { data } = await api.getItens(grupo.id);
      setItens(data);
      setupWebsocket();
    } catch (error) {
      console.warn('Deu ruim ao buscar itens');
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

  const sairDoGrupo = async () => {
    try {
      await api.sairDoGrupo(grupo.id, usuarioLogado);
      toRouteAuth('Home');
    } catch (error) {
      console.warn('Deu ruim ao sair do grupo');
    }
  };

  const alertRemoveGrupo = (itemId: string) => {
    setItemId(itemId);
    setVisibilit(true);
  };

  useEffect(() => {
    (async () => {
      const { id } = await identity();
      setUsuarioLogado(id);
    })();

    buscarItens();
  }, []);

  useEffect(() => {
    subscribeToNewItem((item: Item) => setItens([item, ...itens]));
  }, [itens]);

  const setupWebsocket = () => {
      disconnect();

      connect(grupo.id);
  }

  const RenderOptionsHost = () => {
    if (usuarioLogado === grupo.host) {
      return <ModalAddUser gruposId={grupo.id} />;
    }

    return (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => setVisibilitExitGroup(true)}
      >
        <Feather name="user-x" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  }

  return (
    <>
      <FadeInView>
        <View>
          <StatusBar>
            <RenderOptionsHost />
          </StatusBar>
          <View style={styles.container}>
            <Lista
              titulo={grupo.nome}
              itens={itens}
              gruposId={grupo.id}
              buscarItens={buscarItens}
              alertRemoveGrupo={alertRemoveGrupo}
            />
          </View>
        </View>
      </FadeInView>
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
      <WarningAlert
        title="Atenção"
        message="Deseja mesmo sair do grupo?"
        show={visibilitExitGroup}
        showConfirmButton
        showCancelButton
        onConfirm={sairDoGrupo}
        onCalcel={() => setVisibilitExitGroup(false)}
        cancelText="Ficar"
        confirmText="Sair agora"
      />
    </>
  );
};

export default GrupoContainer;
