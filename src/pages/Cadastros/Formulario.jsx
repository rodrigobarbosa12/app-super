import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import get from 'lodash/get';
import { withFormik } from 'formik';
import * as yup from 'yup';
import * as Location from 'expo-location';
import StepIndicator from 'react-native-step-indicator';
import StatusBar from '../../components/StatusBar';
import EtapaCadastroStudio from './EtapaCadastroStudio';
import AlertWait from '../../components/AlertWait';
import WarningAlert from '../../components/WarningAlert';
import EtapaEnderaco from './EtapaEndereco';
import EtapaConclusao from './EtapaConclusao';
import api from '../../utils/api';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 30,
    marginRight: 30,
  },
});

const Formulario = ({
  setFieldValue,
  handleSubmit,
  isSubmitting,
  errors,
}) => {
  const [etapas, setEtapas] = useState(0);

  useEffect(() => {
    if (errors.razaoSocial
      || errors.fantasia
      || errors.documento
    ) {
      setEtapas(0);
    }
  }, [errors]);

  const labels = ['Endereço', 'Dados pessoais', 'Conclusão'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };

  return (
    <>
      <StatusBar title="Cadastrar studio" />
      <View
        style={{ top: 10 }}
      >
        <StepIndicator
          direction="horizontal"
          stepCount={3}
          customStyles={customStyles}
          currentPosition={etapas}
          labels={labels}
        />
      </View>
      <View
        style={styles.container}
      >
        {etapas === 0 && (
          <EtapaCadastroStudio
            etapas={etapas}
            setEtapas={setEtapas}
            setFieldValue={setFieldValue}
            errors={errors}
          />
        )}
        {etapas === 1 && (
          <EtapaEnderaco
            etapas={etapas}
            setEtapas={setEtapas}
            setFieldValue={setFieldValue}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        )}
        {etapas === 2 && (
          <EtapaConclusao
            etapas={etapas}
            setEtapas={setEtapas}
          />
        )}
      </View>

      {errors.message && <WarningAlert visibilit message={errors.message} />}

      {isSubmitting
      && (
        <AlertWait
          show
          showProgress
        />
      )}
    </>
  );
};

const getAvatar = (a, b) => {
  const imagens = [
    'https://www.barbeariasaintgermain.com.br/wp-content/uploads/2018/09/logo-saint-germain.png',
    'https://lh3.googleusercontent.com/proxy/f-NrPUSfixPK2JuvEqA5ojUx_PBrl-Irp5N-cpJbkPNb6bq10UrSPG4yp9FcUh2gNHwya4r6bmcleBG9mUQhTAyrCEDTsdDTXZmu6Cv07w887VOB8A8yd0yYyist47pYXamL86uk8nh4Lq8OfZa_',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvX4kkYV8Mfbr_Deob2JGqrRPwjr2xNvYgO4kRG2TXRn1prpUM',
    'https://static.vecteezy.com/system/resources/previews/000/560/694/non_2x/vintage-barbershop-logo-design-vector.jpg',
  ];

  const min = Math.ceil(a);
  const max = Math.floor(b);
  return imagens[Math.floor(Math.random() * (max - min + 1)) + min];
};

export default withFormik({
  mapPropsToValues: () => ({
    razaoSocial: '',
    fantasia: '',
    documento: '',
    horario: '',
    contato: '',
    avatar: getAvatar(1, 5),
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    cidade: '',
    estado: 'SP',
  }),

  validationSchema: yup.object().shape({
    razaoSocial: yup.string().required('* Razão social'),
    fantasia: yup.string().required('* Fantasia'),
    documento: yup.string().min(14, 'Cnpj inválido').max(14, 'Cpnj são apenas 14 digitos'),
    logradouro: yup.string().required('* Logradouro'),
    numero: yup.string().required('* Nº'),
    bairro: yup.string().required('* Bairro'),
    cidade: yup.string().required('* Cidade'),
    // estado: yup.string().required('* Estado'),
  }),

  validateOnChange: false,

  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    try {
      const {
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
      } = values;

      const endereco = `${logradouro}, ${numero} - ${bairro}, ${cidade} - ${estado}, ${cep}`;

      const result = await Location.geocodeAsync(endereco);

      if (!result[0]) {
        setErrors({ message: 'Não encontrei o endereço' });
        return;
      }

      const { latitude, longitude } = result[0];

      const params = { ...values, latitude, longitude };

      await api.cadastrarStudio(params);

      setSubmitting(false);
    } catch (error) {
      setErrors({ message: get(error, 'response.data.message', 'Algo deu errado, tento de novo mais tarde') });
    }
  },

})(Formulario);
