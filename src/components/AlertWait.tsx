import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { themeDefault } from '../utils/colors';

type Props = {
  show: boolean,
  showProgress: () => void
}

const AlertWait = ({ show, showProgress }: Props) => (
  <AwesomeAlert
    show={show}
    showProgress={showProgress}
    title="Aguarde..."
    progressColor={themeDefault.purple}
    progressSize={30}
    contentContainerStyle={{ zIndex: 1, position: 'relative' }}
    alertContainerStyle={{
      top: 0,
      bottom: 0,
      left: 0,
      rigth: 0,
    }}
  />
);

export default AlertWait;
