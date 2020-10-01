import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import FadeInView from '../../components/FadeInView';
import get from 'lodash/get';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { TextInput } from 'react-native-paper';
// import { connectUser } from '../../utils/socket';
import { TOKEN_STORAGE, USER_STORAGE } from '../../utils/constants';
import AlertWait from '../../components/AlertWait';
import WarningAlert from '../../components/WarningAlert';
import Action from './Actions';
import api from '../../utils/api';
import LinkCadastroUsuario from './LinkCadastroUsuario';
import LinkEsqueciSenha from './LinkEsqueciSenha';
import { forAuthRouteReset } from '../../utils/for-auth-route';

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
  input: {
    backgroundColor: '#FFF',
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 5,
    height: 40,
    fontSize: 15,
    paddingLeft: 10,
  },
  title: {
    alignItems: 'center',
  },
  action: {
    marginTop: 20,
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
        fontSize: 45,
        color: '#FFF',
        fontWeight: 'bold',
      }}
      >
        Super
      </Text>
    </View>
    <FadeInView>
      <TextInput
        style={styles.input}
        mode="outlined"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        selectionColor="#000"
        error={!!errors.email}
        label={errors.email && errors.email}
        onChangeText={(email) => setFieldValue('email', email)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        placeholder="Senha"
        secureTextEntry
        selectionColor="#000"
        error={!!errors.senha}
        label={errors.senha && errors.senha}
        onChangeText={(password) => setFieldValue('senha', password)}
      />

      <View style={styles.action}>
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
