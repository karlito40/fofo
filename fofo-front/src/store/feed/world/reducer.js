import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';
import { response } from '../../../lib/store-component';

export default {
  _state: {
    loading: false,
    loadingNext: false,
    sites: []
  },
  self: {
    fetch(state, payload) {
      return response({
        [REQUEST_COMPLETE]: () => ({sites: payload.response.data, loading: false}),
        [REQUEST_LOADING]:  () => ({loading: true}),
        default:            () => ({loading: false})
      });
    },
  }
};
