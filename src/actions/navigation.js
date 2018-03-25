import { reset } from 'redux-form';

// application
import {
  FORM_NAME,
  FORM_RESET,
  STEP_FORWARD,
  STEP_BACKWARD,
} from './../constants';

export const stepForward = () => ({
  type: STEP_FORWARD,
});

export const showResults = () => ({
  type: STEP_FORWARD,
});

export const stepBackward = () => ({
  type: STEP_BACKWARD,
});

export const formReset = () => (dispatch) => {
  dispatch(reset(FORM_NAME));
  dispatch({ type: FORM_RESET });
};
