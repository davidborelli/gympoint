export const updateHelpOrdersRequest = data => {
  return {
    type: '@helpOrders/UPDATE_HELPORDER_REQUEST',
    payload: { data },
  };
};

export const openModal = () => {
  return {
    type: '@helpOrders/MODAL_OPEN',
  };
};
