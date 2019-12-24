export const createPlanRequest = data => {
  return {
    type: '@plan/CREATE_PLAN_REQUEST',
    payload: { data },
  };
};

export const updatePlanRequest = data => {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { data },
  };
};
