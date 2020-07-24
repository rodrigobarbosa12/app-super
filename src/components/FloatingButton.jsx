import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

const FloatingButton = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

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
              onPress: () => console.warn('Criar Grupo'),
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
