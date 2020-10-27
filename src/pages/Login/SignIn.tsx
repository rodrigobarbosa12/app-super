import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TextInput,
} from 'react-native';
import FadeInView from '../../components/FadeInView';
import get from 'lodash/get';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { TOKEN_STORAGE, USER_STORAGE } from '../../utils/constants';
import AlertWait from '../../components/AlertWait';
import WarningAlert from '../../components/WarningAlert';
import Action from './Actions';
import api from '../../utils/api';
import LinkCadastroUsuario from './LinkCadastroUsuario';
import LinkEsqueciSenha from './LinkEsqueciSenha';
import { forAuthRouteReset } from '../../utils/for-auth-route';
import styleGlobal from '../styles';
import colors from '../../utils/colors';

type Props = {
  handleSubmit: () => void,
  setFieldValue: Function,
  isSubmitting: boolean,
  setErrors: ({}) => void,
  errors: {
    email: string,
    senha: string,
    message: string
  },
}

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
  },
  cadastroUsuario: {
    alignItems: 'center',
    marginLeft: 25,
    marginTop: 10,
  },
});

const SignIn = ({
  handleSubmit,
  setFieldValue,
  isSubmitting,
  setErrors,
  errors,
}: Props) => (
  <>
    <View style={styles.title}>
      <Text style={{
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 75,
        color: '#FFF',
      }}
      >
        Super
      </Text>
    </View>
    <FadeInView>
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <TextInput
          style={styleGlobal.inputLogin}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder={!!errors.email ? errors.email : 'E-mail'}
          placeholderTextColor={!!errors.email ? colors.danger : '#999'}
          selectionColor={!!errors.email ? colors.danger : '#999'}
          onChangeText={(email) => setFieldValue('email', email)}
        />
        <TextInput
          style={styleGlobal.inputLogin}
          placeholderTextColor={!!errors.senha ? colors.danger : '#999'}
          placeholder={!!errors.senha ? errors.senha : 'Senha'}
          secureTextEntry
          selectionColor="#000"
          onChangeText={(password) => setFieldValue('senha', password)}
        />
        <Action
          handleSubmit={handleSubmit}
        />
      </View>

      <View style={styles.cadastroUsuario}>
        <LinkEsqueciSenha />
      </View>
    </FadeInView>

    <View style={styles.cadastroUsuario}>
      <LinkCadastroUsuario />
    </View>

    <WarningAlert
      show={!!errors.message}
      message={errors.message}
      onConfirm={() => setErrors({})}
      showConfirmButton
      confirmText="Ok"
    />

    <AlertWait
      show={isSubmitting}
      showProgress
      title="Aguarde..."
    />
  </>
);

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    senha: '',
  }),

  validationSchema: yup.object().shape({
    email: yup.string().email('Email inválido').required('* Email é Obrigatório'),
    senha: yup.string().required('* Senha é obrigatória'),
  }),

  validateOnChange: false,

  handleSubmit: async (values, { setErrors }) => {
    try {
      const { data: { token, usuario } } = await api.login(values);

      await AsyncStorage.multiSet([
        [TOKEN_STORAGE, token],
        [USER_STORAGE, JSON.stringify(usuario)],
      ]);

      // connectUser(usuario.id);
      forAuthRouteReset('Home');
    } catch (error) {
      setErrors({ message: get(error, 'response.data.message', 'Algo deu errado, tento de novo mais tarde') });
    }
  },

})(SignIn);
