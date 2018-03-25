import { reset } from 'redux-form';

// application
import { fields } from './../datas/form-83.json';
import {
  FORM_NAME,
  FORM_RESET,
  FORM_SUBMIT,
  FIELDS_LOADED,
} from './../constants';

export const formSubmit = values => (dispatch) => {
  console.log('values', values);
  dispatch({
    values,
    type: FORM_SUBMIT,
  });
};

export const formReset = () => (dispatch) => {
  dispatch(reset(FORM_NAME));
  dispatch({ type: FORM_RESET });
};

export const loadForm = () => ({ type: FIELDS_LOADED, fields });
