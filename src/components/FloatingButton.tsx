import * as React from 'react';
import { Alert } from 'react-native';
import get from 'lodash/get';
import { FAB, Portal, Provider } from 'react-native-paper';
import identity from '../utils/identity';
import api from '../utils/api';

type Props = {
  buscarGrupos: () => void,
}

const getUsuarioId = async () => await identity();

const criarGrupo = async (nome: string, buscarGrupos: () => void) => {
  try {
    const { id } = await getUsuarioId();

    await api.novoGrupo({
      usuarioId: id,
      adm: id,
      nome
    });

    buscarGrupos();
  } catch (error) {
    Alert.alert(get(error, 'response.data.message', 'Algo deu errado, tento de novo mais tarde'))
  }
};

const FloatingButton = ({ buscarGrupos }: Props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'arrow-down' : 'arrow-up'}
          actions={[
            { icon: 'bell', onPress: () => console.warn('Pressed add') },
            {
              icon: 'plus',
              label: 'Novo grupo',
              onPress: () => Alert.prompt(
                'Novo grupo',
                'Qual o nome do grupo?',
                [
                  {
                    text: "Depois",
                    style: "cancel"
                  },
                  {
                    text: "Criar",
                    onPress: nome => criarGrupo(nome, buscarGrupos)
                  }
                ]
              ),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default FloatingButton;
