import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from '../utils/colors';

type Props = {
  visibilit?: boolean,
  title?: string,
  message?: string,
  onConfirm?: () => void,
  onCalcel?: () => void,
  confirmText?: string,
  cancelText?: string,
}

const WarningAlert = ({
  visibilit,
  title,
  message,
  onConfirm,
  onCalcel,
  confirmText,
  cancelText,
}: Props) => (
  <AwesomeAlert
    show={visibilit}
    title={title}
    message={message}
    closeOnTouchOutside={false}
    showCancelButton
    showConfirmButton
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
  visibilit: false,
  title: '',
  message: '',
  onConfirm: undefined,
  onCalcel: undefined,
  confirmText: undefined,
  cancelText: undefined,
}

export default WarningAlert;
