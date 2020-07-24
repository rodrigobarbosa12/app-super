import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { TextInput, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import StatusBar from '../../components/StatusBar';
import AlertWait from '../../components/AlertWait';
import WarningAlert from '../../components/WarningAlert';
import { themeDefault } from '../../utils/colors';
import api from '../../utils/api';

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
  setFieldValue,
  handleSubmit,
  isSubmitting,
  errors,
}) => (
  <>
    <StatusBar title="Cadastrar studio" />
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="#999"
        autoCorrect={false}
        error={errors.endereco}
        label={errors.endereco && errors.endereco}
        onChangeText={(text) => setFieldValue('endereco', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do estabelecimento"
        placeholderTextColor="#999"
        autoCorrect={false}
        error={errors.razaoSocial}
        label={errors.razaoSocial && errors.razaoSocial}
        onChangeText={(text) => setFieldValue('razaoSocial', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fantasia"
        placeholderTextColor="#999"
        autoCorrect={false}
        error={errors.fantasia}
        label={errors.fantasia && errors.fantasia}
        onChangeText={(text) => setFieldValue('fantasia', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cnpj"
        placeholderTextColor="#999"
        autoCorrect={false}
        error={errors.documento}
        label={errors.documento && errors.documento}
        onChangeText={(text) => setFieldValue('documento', text)}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit}
      >
        Cadastrar
      </Button>
    </View>
    {isSubmitting
    && (
      <AlertWait
        show
        showProgress
      />
    )}
    {errors.message && (
      <WarningAlert
        visibilit
        title={errors.message}
        message
      />
    )}
  </>
);

export default withFormik({
  mapPropsToValues: () => ({
    endereco: '',
    razaoSocial: '',
    fantasia: '',
    documento: '',
    horario: '9:00 as 17:00',
    contato: '97454-7895',
    facebookImageProfile: 'http://blog.lunarditattoo.com.br/wp-content/uploads/2019/02/Lunardi-Tattoo-Studio.png',
    latitude: -23.641221,
    longitude: -46.4893397,
  }),

  validationSchema: yup.object().shape({
    endereco: yup.string().required('Endereço é obrigatório'),
    razaoSocial: yup.string().required('Razão social é obrigatória'),
    fantasia: yup.string().required('Fantasia é obrigatória'),
    documento: yup.string()
      .min(14, 'Cnpj inválido')
      .max(14, 'Cpnj são apenas 14 digitos'),
  }),

  validateOnChange: false,

  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    const result = await Location.geocodeAsync(values.endereco);

    if (!result[0]) {
      setErrors({ message: 'Não encontrei o endereço' });
      return;
    }

    const { latitude, longitude } = result[0];

    const params = { ...values, latitude, longitude };

    await api.cadastrarStudio(params);

    setSubmitting(false);
  },

})(CadastroStudio);
