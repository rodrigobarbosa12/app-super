import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from '../utils/colors';

const WarningAlert = ({
  visibilit,
  setErrors,
  title,
  message,
  onConfirm,
  onCalcel,
  confirmText,
  cancelText,
}) => (
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

export default WarningAlert;
