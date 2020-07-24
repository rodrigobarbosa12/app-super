import React from 'react';
import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import rocket from '../../animations/rocket.json';
import AnimatedView from '../../components/AnimatedView';
import { themeDefault } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: themeDefault.purple,
  },
});

const EtapaConclusao = ({ etapas, setEtapas }) => (
  <>
    <AnimatedView duration={1000}>
      <View style={styles.container}>
        <Lottie
          resizeMode="contain"
          autoSize
          source={rocket}
          autoPlay
          loo
        />
      </View>
    </AnimatedView>
    <View>
      <TouchableOpacity
        onPress={() => setEtapas(etapas - 1)}
        style={styles.button}
      >
        <Icon
          name="arrow-left"
          size={20}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  </>
);

export default EtapaConclusao;
