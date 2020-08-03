import React, { useState } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
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
      nascimento: string,
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
  status,
  setErrors,
  errors,
}: Props) => {
  const [nascimento, setNascimento] = useState<string>('');
  return (
    <>
      <StatusBar title="Cadastro" />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="* Nome"
          autoCorrect={false}
          error={!!errors.nome}
          label={errors.nome && errors.nome}
          onChangeText={(text) => setFieldValue('nome', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="* E-mail"
          autoCapitalize="none"
          autoCorrect={false}
          error={!!errors.email}
          label={errors.email && errors.email}
          onChangeText={(text) => setFieldValue('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="* Senha"
          secureTextEntry
          autoCorrect={false}
          error={!!errors.senha}
          label={errors.senha && errors.senha}
          onChangeText={(text) => setFieldValue('senha', text)}
        />

        <DatePicker
          style={{
            borderColor: 'transparent',
            width: 350
          }}
          date={nascimento}
          mode="date"
          placeholder={!!errors.nascimento ? errors.nascimento : '* Nascimento'}
          format="DD/MM/YYYY"
          minDate="01/01/1970"
          maxDate={moment().format('DD/MM/Y')}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              borderWidth: 0,
              borderBottomColor: !!errors.nascimento ? 'red' : '',
              borderBottomWidth: 1,
              marginLeft: 36
            }
          }}
          onDateChange={(data: string) => {
            setNascimento(data);
            setFieldValue('nascimento', moment(data).format('Y-MM-DD'));
          }}
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

      {status && status === 'cadastrado' && (
        <AlertWait
          show
          title="Bem-vindo ao Super!"
          message="Faça login para continuar"
          showConfirmButton
          onConfirm={() => Actions.Login()}
          confirmText="Login"
        />
      )}

      {isSubmitting
      && (
        <AlertWait
          show
          showProgress
          title="Aguarde..."
        />
      )}
    </>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    nome: '',
    email: '',
    senha: '',
    nascimento: '',
  }),

  validationSchema: yup.object().shape({
    nome: yup.string().required('* Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('* Email é obrigatório'),
    senha: yup.string()
      .min(8, '* Deve possuír no mínimo 8 caracteres'),
    nascimento: yup.string().required('* Nascimento é obrigatório'),
  }),

  validateOnChange: false,

  handleSubmit: async (values, { setSubmitting, setErrors, setStatus }) => {
      try {
        await api.singUp(values);

        setSubmitting(false);
        setStatus('cadastrado');

      } catch (error) {
        setErrors({ message: get(error, 'response.data.message', 'Algo deu errado, tento de novo mais tarde') });
      }
  },

})(CadastroStudio);
