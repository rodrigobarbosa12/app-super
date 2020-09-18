import React, { useState } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import ModalAddGrupo from './ModalAddGrupo';

type Props = {
  buscarGrupos: () => void,
}

const FloatingButton = ({ buscarGrupos }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <>
      <ModalAddGrupo
        buscarGrupos={buscarGrupos}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
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
                onPress: () => setModalVisible(true),
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
    </>
  );
};

export default FloatingButton;
