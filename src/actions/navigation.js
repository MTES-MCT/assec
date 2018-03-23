import { reset } from 'redux-form';
import deepequal from 'fast-deep-equal';

// application
import Constants from './../constants';
import splitObject from './../lib/splitObject';

export const stepReseted = fields => ({
  fields,
  type: 'onFormReset',
});

export const stepForward = () => (dispatch, getState) => {
  const { activestep, fields, disabledfields } = getState();
  const filtered = fields
    .map((obj, index) => {
      // si index est superieur
      const issup = index > activestep;
      // si index est pas inclus dans les etapes desactivees
      const notindexed = issup && !disabledfields.includes(index);
      return notindexed ? index : false;
    })
    .filter(v => v !== false);
  return dispatch({
    type: 'onStepForwardTo',
    // max value pour les résultats
    // FIXME -> risque de planter à un moment
    index: filtered[0] || fields.length,
  });
};

export const stepBackward = () => ({
  type: 'onStepBackward',
});

export const stepReset = () => (dispatch, getState) => {
  const { defaultfields } = getState();
  // FIXME -> see reducers for perfomances
  const fields = JSON.parse(defaultfields);
  dispatch(stepReseted(fields));
  dispatch(reset(Constants.FORM_NAME));
};

export const checkConditions = () => (dispatch, getState) => {
  const { form, activestep, fields } = getState();
  const nextindex = activestep + 1;
  // si le prochain existe pas dans le tableau des fields
  const nextfield = fields[nextindex];
  if (!nextfield) return;

  const formvalues = splitObject(form[Constants.FORM_NAME].values);
  // on recupere la prochaine étape que le formulaire doit afficher normalement
  const nextconditions = nextfield.conditions;
  if (!nextconditions || !nextconditions.length) return;
  const firstcond = nextconditions[0];
  const hasconditions = formvalues.filter(obj => deepequal(firstcond, obj));
  const valideconditions = hasconditions.length > 0;
  if (!valideconditions) {
    dispatch({
      index: nextindex,
      type: 'onRemoveField',
    });
  } else {
    dispatch({
      index: nextindex,
      type: 'onInsertField',
    });
  }
};
