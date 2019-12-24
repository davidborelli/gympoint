export const createStudentRequest = data => {
  return {
    type: '@student/CREATE_STUDENT_REQUEST',
    payload: { data },
  };
};

export const updateStudentRequest = data => {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { data },
  };
};
