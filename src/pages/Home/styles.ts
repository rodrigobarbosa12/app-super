import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
  container: {
    // backgroundColor: '#f8f9fa',
    paddingBottom: 700,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15,
    color: '#737380',
  },
  headerTextBold: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#737380',
  },
  empty: {
    top: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsList: {
    marginTop: 10,
    padding: 15,
    height: Dimensions.get('window').height,
    maxHeight: 460,
  },
  item: {
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 24,
    borderRadius: 8,
    shadowColor: '9px 7px 5px  10px rgba(50, 50, 50, 0.77)',
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
  },
  cardGrupoName: {
    fontSize: 20,
    color: '#41414d',
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  cardGrupoDate: {
    fontSize: 11,
    color: '#41414d',
  },
  itemProperty: {
    // marginRight: 20,
    fontSize: 15,
    color: '#41414d',
    fontWeight: 'bold',
  },
  itemValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380',
  },
  itemValueRow: {
    // padding: 10,
    marginLeft: -40,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380',
  },
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonTrash: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detailsButtonText: {
    color: colors.matteBlue,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
