import { reset } from 'redux-form';

// application
import fields from './../datas/form-83.json';
import alerts from './../datas/alerts-83.json';
import schema from './../datas/schemas-83.json';
import DecisionTree from './../lib/decision-tree';
import {
  FORM_NAME,
  FORM_RESET,
  FORM_SUBMIT,
  FIELDS_LOADED,
} from './../constants';

// generate decision schema
const decision = 'alerte';
const parameters = ['canal', 'nomcanal', 'usage', 'origine'];
const dtree = new DecisionTree(schema, decision, parameters);

export const formSubmit = values => (dispatch, getstate) => {
  const { steppedform } = getstate();
  const submitted = Object.assign({}, values);
  const choices = Object.keys(values).reduce(
    (acc, key) => Object.assign({}, acc, { [key]: values[key].choice }),
    {},
  );
  const prediction = Object.assign({}, steppedform.defaults, choices);
  const alertindex = dtree.predict(prediction);
  const result = steppedform.alerts[alertindex];
  dispatch({
    type: FORM_SUBMIT,
    submitted: { result, submitted },
  });
};

export const formReset = () => (dispatch) => {
  dispatch(reset(FORM_NAME));
  dispatch({ type: FORM_RESET });
};

export const loadForm = () => ({ type: FIELDS_LOADED, fields, alerts });
