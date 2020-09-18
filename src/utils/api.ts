import xhr from './xhr';
import headersApi from './headers-api';

const post = async (rota: string, params = {}) => xhr.post(rota, params, { headers: await headersApi() });
const get = async (rota: string, params = {}) => xhr.get(rota, { params, headers: await headersApi() });
// const put = async (rota, params = {}) => xhr.put(rota, params, { headers: await headersApi() });
const deletar = async (rota: string) => xhr
  .delete(rota, { headers: await headersApi() });

const login = (params: Object) => post('/login', params);
const singUp = (params: Object) => post('/cadastro', params);

const novoGrupo = (params: Object) => post('/novo-grupo', params);
const novoItem = (params: Object) => post('/novo-item', params);

const getItens = (gruposId: string) => get(`/item/${gruposId}`);
const getGrupos = (usuarioId: string) => get(`/grupos/${usuarioId}`);
const removeGrupo = (itemId: string) => deletar(`/remove-grupo/${itemId}`);
const removeIten = (grupoId: string) => deletar(`/remove-item/${grupoId}`);

export default {
  login,
  singUp,
  novoGrupo,
  novoItem,
  getGrupos,
  getItens,
  removeGrupo,
  removeIten,
};
