import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import identity from '../utils/identity';

const AvatarProfile = () => {
  const [sexoUsuario, setSexoUsuario] = useState < string > ('M');
  useEffect(() => {
    (async () => {
      const { sexo } = await identity();
      setSexoUsuario(sexo);
    })();
  }, []);

  const masculino = require('../img/perfil-m-3.jpg');
  const feminino = require('../img/perfil-f-1.jpg');

  const img = (sexoUsuario === 'M') ? masculino : feminino;

  return (
    <Avatar.Image size={40} source={img} />
  );
};

export default AvatarProfile;
