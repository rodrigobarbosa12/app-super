import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#f8f9fa',
    top: 10,
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
  itemsList: {
    marginTop: 32,
    height: 400,
    maxHeight: 400,
  },
  item: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
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
    fontSize: 14,
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
