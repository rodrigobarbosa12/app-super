import React, { useState } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';
import { withFormik } from 'formik';
import * as yup from 'yup';
import get from 'lodash/get';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StatusBar from '../../components/StatusBar';
import AlertWait from '../../components/AlertWait';
import WarningAlert from '../../components/WarningAlert';
import { themeDefault } from '../../utils/colors';
import styleGlobal from '../styles';
import colors from '../../utils/colors';
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
      confirmarSenha: string,
      nascimento: string,
      message: string
    },
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: themeDefault.purple,
  },
  input: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 15,
    color: '#7059c1',
    fontWeight: 'bold',
  }
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
          style={styleGlobal.inputLogin}
          keyboardType="default"
          autoCapitalize="none"
          placeholder={!!errors.nome ? errors.nome : '* Nome'}
          placeholderTextColor={!!errors.nome ? colors.danger : '#999'}
          selectionColor={!!errors.nome ? colors.danger : '#999'}
          onChangeText={(nome) => setFieldValue('nome', nome)}
        />

        <TextInput
          style={styleGlobal.inputLogin}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder={!!errors.email ? errors.email : '* E-mail'}
          placeholderTextColor={!!errors.email ? colors.danger : '#999'}
          selectionColor={!!errors.email ? colors.danger : '#999'}
          onChangeText={(email) => setFieldValue('email', email)}
        />

        <TextInput
          style={styleGlobal.inputLogin}
          keyboardType="default"
          secureTextEntry
          placeholder={!!errors.senha ? errors.senha : '* Senha'}
          placeholderTextColor={!!errors.senha ? colors.danger : '#999'}
          selectionColor={!!errors.senha ? colors.danger : '#999'}
          onChangeText={(senha) => setFieldValue('senha', senha)}
        />

        <TextInput
          style={styleGlobal.inputLogin}
          keyboardType="default"
          secureTextEntry
          placeholder={!!errors.confirmarSenha ? errors.confirmarSenha : '* Confirmar senha'}
          placeholderTextColor={!!errors.confirmarSenha ? colors.danger : '#999'}
          selectionColor={!!errors.confirmarSenha ? colors.danger : '#999'}
          onChangeText={(confirmarSenha) => setFieldValue('confirmarSenha', confirmarSenha)}
        />

        <DatePicker
          style={styleGlobal.inputDatePicker}
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
              right: 1,
              marginLeft: 0
            },
            dateInput: {
              borderWidth: 0,
              borderBottomColor: !!errors.nascimento ? 'red' : '',
              marginLeft: 1,
            },
            placeholderText: {
              color: !!errors.nascimento ? colors.danger : '#999',
              right: !!errors.nascimento ? 51 : 95,
              // left: 0
            }
          }}
          onDateChange={(data: string) => {
            setNascimento(data);
            setFieldValue('nascimento', moment(data).format('Y-MM-DD'));
          }}
        />
        <TouchableOpacity
          style={styleGlobal.button}
          onPress={handleSubmit}
        >
          <Text style={styles.text}>Cadastrar</Text>
        </TouchableOpacity>
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
    sexo: 'M',
  }),

  validationSchema: yup.object().shape({
    nome: yup
      .string()
      .required('* Nome é obrigatório'),

    email: yup
      .string()
      .email('Email inválido')
      .required('* Email é obrigatório'),

    senha: yup
      .string()
      .required('* Senha é obrigatória')
      .min(8, '* Deve possuír no mínimo 8 caracteres'),

    confirmarSenha: yup
    .string()
    .required('* Por favor confirme sua senha')
    .min(8, '* Deve possuír no mínimo 8 caracteres'),

    nascimento: yup
      .string()
      .required('* Nascimento é obrigatório'),

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
