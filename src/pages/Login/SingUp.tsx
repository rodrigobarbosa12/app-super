import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { withFormik } from 'formik';
import * as yup from 'yup';
import get from 'lodash/get';
import { TextInput, Button } from 'react-native-paper';
import StatusBar from '../../components/StatusBar';
import AlertWait from '../../components/AlertWait';
import WarningAlert from '../../components/WarningAlert';
import { themeDefault } from '../../utils/colors';
import api from '../../utils/api';

type Props = {
    handleSubmit: () => void,
    setFieldValue: Function,
    isSubmitting: boolean,
    setErrors: ({}) => void,
    errors: {
      nome: string,
      email: string,
      senha: string,
      message: string
    },
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 30,
    marginRight: 30,
  },
  input: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: themeDefault.purple,
  },
});

const CadastroStudio = ({
  handleSubmit,
  setFieldValue,
  isSubmitting,
  setErrors,
  errors,
}: Props) => (
  <>
    <StatusBar title="Cadastro" />
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#999"
        autoCorrect={false}
        error={!!errors.nome}
        label={errors.nome && errors.nome}
        onChangeText={(text) => setFieldValue('nome', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        placeholderTextColor="#999"
        autoCorrect={false}
        error={!!errors.email}
        label={errors.email && errors.email}
        onChangeText={(text) => setFieldValue('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#999"
        autoCorrect={false}
        error={!!errors.senha}
        label={errors.senha && errors.senha}
        onChangeText={(text) => setFieldValue('senha', text)}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit}
      >
        Cadastrar
      </Button>
    </View>

    <WarningAlert
      show={!!errors.message}
      message={errors.message}
      onConfirm={() => setErrors({})}
      showConfirmButton
      confirmText="Ok"
    />

    {isSubmitting
    && (
      <AlertWait
        show
        showProgress
      />
    )}
  </>
);

export default withFormik({
  mapPropsToValues: () => ({
    nome: '',
    email: '',
    senha: '',
  }),

  validationSchema: yup.object().shape({
    nome: yup.string().required('* Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('* Email é Obrigatório'),
    senha: yup.string()
      .min(8, '* Deve possuír no mínimo 8 caracteres'),
  }),

  validateOnChange: false,

  handleSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await api.singUp(values);

        setSubmitting(false);

        Actions.Login();
      } catch (error) {
        setErrors({ message: get(error, 'response.data.message', 'Algo deu errado, tento de novo mais tarde') });
      }
  },

})(CadastroStudio);
