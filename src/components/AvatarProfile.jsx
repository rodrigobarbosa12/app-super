import * as React from 'react';
import { Avatar } from 'react-native-paper';

const AvatarProfile = () => (
  <Avatar.Image size={40} source={require('./perfil.jpg')} />
);

export default AvatarProfile;
