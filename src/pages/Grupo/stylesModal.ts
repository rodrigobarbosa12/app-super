import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  inputText: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    width: 220,
    backgroundColor: '#fff',
  },
  inputNumber: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    width: 100,
    backgroundColor: '#fff',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.purple,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    top: 15,
    backgroundColor: colors.success,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;
