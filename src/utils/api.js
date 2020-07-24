import xhr from './xhr';
import headersApi from './headers-api';

const post = async (rota, params = {}) => xhr.post(rota, params, { headers: await headersApi() });
const get = async (rota, params = {}) => xhr.get(rota, { params, headers: await headersApi() });
// const put = async (rota, params = {}) => xhr.put(rota, params, { headers: await headersApi() });
const deletar = async (rota) => xhr
  .delete(rota, { headers: await headersApi() });

const login = (params) => post('/login', params);

const getItens = (gruposId) => get(`/item/${gruposId}`);
const getGrupos = (usuarioId) => get(`/grupos/${usuarioId}`);
const removeGrupo = (itemId) => deletar(`/remove-grupo/${itemId}`);
const removeIten = (grupoId) => deletar(`/remove-item/${grupoId}`);

export default {
  login,
  getGrupos,
  getItens,
  removeGrupo,
  removeIten,
};
