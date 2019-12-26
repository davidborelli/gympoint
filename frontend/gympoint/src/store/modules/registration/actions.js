export const createRegistrationRequest = data => {
  return {
    type: '@registration/CREATE_REGISTRATION_REQUEST',
    payload: { data },
  };
};

export const updateRegistrationRequest = data => {
  return {
    type: '@registration/UPDATE_REGISTRATION_REQUEST',
    payload: { data },
  };
};
