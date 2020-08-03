import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from '../utils/colors';

type Props = {
  show: boolean,
  showProgress?: boolean,
  title: string,
  message?: string,
  showConfirmButton: boolean,
  onConfirm: () => void,
  confirmText: string,
}

const AlertWait = ({
    show,
    showProgress,
    title,
    message,
    showConfirmButton,
    onConfirm,
    confirmText,
  }: Props) => (
  <AwesomeAlert
    show={show}
    showProgress={showProgress}
    title={title}
    message={message}
    progressColor={colors.purple}
    progressSize={30}
    showConfirmButton={showConfirmButton}
    confirmButtonColor={colors.success}
    onConfirmPressed={onConfirm}
    confirmText={confirmText}
    contentContainerStyle={{ zIndex: 1, position: 'relative' }}
    alertContainerStyle={{
      top: 0,
      bottom: 0,
      left: 0,
      rigth: 0,
    }}
  />
);

AlertWait.defaultProps = {
  showProgress: false,
  mensagem: '',
  showConfirmButton: false,
  onConfirm: undefined,
  confirmText: '',
};

export default AlertWait;
