import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    // format { [commentId]: { loading: boolean }}
    comments: {},
    // format { [highlightId]: { loading: boolean }}
    highlights: {},
  },
  self: {
    setComment: handleForm.bind(null, 'comments'),
    setHighlight: handleForm.bind(null, 'highlights'),
  }
};


function handleForm(form, state, payload, actionId) {
  const targetId = payload.payloadOrigin.id;
  if(state[form][targetId] && state[form][targetId].actionId > actionId) {
    return state;
  }

  let stateForm;
  switch(payload.status) {
    case REQUEST_LOADING:
      stateForm = {
        ...state[form], 
        [targetId]: {
          id: actionId,
          loading: true,
        }
      }; 

      return {...state,  [form]: stateForm};

    case REQUEST_COMPLETE:
    case REQUEST_ERROR:
    default:
      stateForm = {
        ...state[form], 
        [targetId]: {
          id: actionId,
          loading: false,
        }
      }; 

      return {...state,  [form]: stateForm};
  }
}