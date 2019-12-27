import produce from 'immer';

const INITIAL_STATE = {
  helpOrdersModalOpen: false,
};

export default function helpOrdersModal(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrders/MODAL_OPEN': {
        draft.helpOrdersModalOpen = !draft.helpOrdersModalOpen;
        break;
      }

      default:
    }
  });
}
