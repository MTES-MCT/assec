import deepequal from 'fast-deep-equal';
import { getFormValues } from 'redux-form';

// application
import splitObject from './../lib/split-object';
import { FORM_NAME, STEP_INSERT, STEP_REMOVE } from './../constants';

const getArrayValues = (state) => {
  const formvalues = getFormValues(FORM_NAME)(state);
  return splitObject(formvalues);
};

const checkConditions = fieldindex => (dispatch, getState) => {
  const state = getState();
  const nextindex = fieldindex + 1;
  const nextfield = state.steppedform.fields[nextindex];
  if (!nextfield) return;
  // FIXME -> use an array of conditions to validate with and/or
  // si une conditions est remplie on affiche la prochaine étape
  // sinon on l'ajouter dans un array d'étapes à ne pas afficher
  const { conditions } = nextfield;
  const hasnocondition = conditions === false;
  const formvalues = getArrayValues(state);
  const validconditions = formvalues.filter(obj =>
    deepequal(conditions[0] || {}, obj));
  const type =
    hasnocondition || validconditions.length > 0 ? STEP_INSERT : STEP_REMOVE;
  dispatch({
    type,
    index: nextindex,
  });
};

export default checkConditions;
