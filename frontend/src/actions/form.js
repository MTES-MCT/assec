import { reset } from 'redux-form';

// application
import zones from './../datas/zones';
import fields from './../datas/questions.json';
import alerts from './../datas/alerts-83.json';
import schema from './../datas/schemas-83.json';
import DecisionTree from './../core/decision-tree';
import { SUOS } from './../apolloql';
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

export const loadForm = client => (dispatch) => {
  client
    .query({ query: SUOS, variables: { dpt: '5ad84a9f73150f000eeaf0d0' } })
    .then(({ data: { suos } }) => {
      const questions = fields.map((question) => {
        if (question.id === 'zones') {
          return { ...question, values: zones };
        }
        return {
          ...question,
          values: suos[question.id].map(({ id, name }) => ({
            id,
            name,
          })),
        };
      });
      dispatch({ type: FIELDS_LOADED, fields: questions, alerts });
    });
};
