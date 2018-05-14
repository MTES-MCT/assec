import { reset } from 'redux-form';
import { FORM_NAME, FORM_RESET } from './../constants';

export const formReset = () => (dispatch) => {
  dispatch(reset(FORM_NAME));
  dispatch({ type: FORM_RESET });
};

export default formReset;
