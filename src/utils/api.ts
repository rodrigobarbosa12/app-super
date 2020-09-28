import xhr from './xhr';
import headersApi from './headers-api';

const post = async (rota: string, params = {}) => xhr.post(rota, params, { headers: await headersApi() });
const get = async (rota: string, params = {}) => xhr.get(rota, { params, headers: await headersApi() });
// const put = async (rota, params = {}) => xhr.put(rota, params, { headers: await headersApi() });
const deletar = async (rota: string) => xhr
  .delete(rota, { headers: await headersApi() });

const login = (params: Object) => post('/login', params);
const singUp = (params: Object) => post('/cadastro', params);

/**GRUPOS */
const novoGrupo = (params: Object) => post('/novo-grupo', params);
const addUser = (params: Object) => post('/grupos/add-usuario', params);
const getGrupos = (usuarioId: string) => get(`/grupos/${usuarioId}`);
const removeGrupo = (gruposId: string, usuariosId: string) => deletar(`/remove-grupo/${gruposId}/${usuariosId}`);
const sairDoGrupo = (gruposId: string, usuariosId: string) => deletar(`/sair-grupo/${gruposId}/${usuariosId}`);

/**ITENS */
const novoItem = (params: Object) => post('/novo-item', params);
const getItens = (itemId: string) => get(`/item/${itemId}`);
const removeIten = (itemId: string) => deletar(`/remove-item/${itemId}`);

export default {
  login,
  singUp,
  novoGrupo,
  addUser,
  novoItem,
  getGrupos,
  getItens,
  removeGrupo,
  removeIten,
  sairDoGrupo,
};
