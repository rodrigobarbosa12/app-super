import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from '../utils/colors';

type Props = {
  show?: boolean,
  title?: string,
  message?: string,
  showCancelButton: boolean,
  showConfirmButton: boolean,
  onConfirm?: () => void,
  onCalcel?: () => void,
  confirmText?: string,
  cancelText?: string,
}

const WarningAlert = ({
  show,
  title,
  message,
  showCancelButton,
  showConfirmButton,
  onConfirm,
  onCalcel,
  confirmText,
  cancelText,
}: Props) => (
  <AwesomeAlert
    show={show}
    title={title}
    message={message}
    closeOnTouchOutside={false}
    showCancelButton={showCancelButton}
    showConfirmButton={showConfirmButton}
    cancelText={cancelText}
    confirmText={confirmText}
    confirmButtonColor={colors.matteBlue}
    cancelButtonColor={colors.metteDanger}
    onConfirmPressed={onConfirm}
    onCancelPressed={onCalcel}
    contentContainerStyle={{ zIndex: 1, position: 'relative' }}
    alertContainerStyle={{
      top: 0,
      bottom: 0,
      left: 0,
      rigth: 0,
    }}
  />
);

WarningAlert.defaultProps = {
  show: false,
  title: '',
  message: '',
  showCancelButton: false,
  showConfirmButton: false,
  onConfirm: undefined,
  onCalcel: undefined,
  confirmText: undefined,
  cancelText: undefined,
}

export default WarningAlert;
