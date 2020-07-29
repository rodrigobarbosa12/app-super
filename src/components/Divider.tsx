import React from 'react';
import { View } from 'react-native';

type Props = {
  radius: number,
  width: number,
  color: string,
  top: number,
  bottom: number,
}

const Divider = ({
  radius,
  width,
  color,
  top,
  bottom,
}: Props) => (
  <View style={{
    borderRadius: radius,
    borderWidth: width,
    borderColor: color,
    marginTop: top,
    marginBottom: bottom,
  }}
  />
);

Divider.defaultProps = {
  radius: 1,
  width: 0.5,
  color: '#d6d7da',
  top: 0,
  bottom: 0,
};

export default Divider;
