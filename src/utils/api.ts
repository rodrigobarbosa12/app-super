import xhr from './xhr';
import headersApi from './headers-api';

const post = async (rota: string, params: Object = {}) => xhr.post(rota, params, { headers: await headersApi() });

const get = async (rota: string, params: Object = {}) => xhr.get(rota, { params, headers: await headersApi() });

const deletar = async (rota: string) => xhr.delete(rota, { headers: await headersApi() });

// const put = async (rota: string, params: Object = {}) => xhr.put(rota, params, { headers: await headersApi() });

const login = (params: Object) => post('/login', params);
const singUp = (params: Object) => post('/create', params);

/**GRUPOS */
const novoGrupo = (params: Object) => post('/new-group', params);
const addUser = (params: Object) => post('/groups/add-user', params);
const getGrupos = (usuarioId: string) => get(`/groups/${usuarioId}`);
const removeGrupo = (gruposId: string, usuariosId: string) => deletar(`/remove-group/${gruposId}/${usuariosId}`);
const sairDoGrupo = (gruposId: string, usuariosId: string) => deletar(`/leave-group/${gruposId}/${usuariosId}`);

/**ITENS */
const novoItem = (params: Object) => post('/new-item', params);
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
