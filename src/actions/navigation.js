import { reset } from 'redux-form';
import deepequal from 'fast-deep-equal';

// application
import Constants from './../constants';

export const stepReseted = fields => ({
  fields,
  type: 'onFormReset',
});

export const stepForward = () => ({
  type: 'onStepForward',
});

export const stepBackward = () => ({
  type: 'onStepBackward',
});

export const removeField = id => ({
  id,
  type: 'onRemoveField',
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
  const nextfield = fields[activestep];
  // on recupere le nouveau noeud json en cours
  const { conditions } = nextfield;
  if (!conditions || !conditions.length) return;
  // on recupere les valeurs du form
  const formvalues = form[Constants.FORM_NAME].values;
  console.log('formvalues', formvalues);
  console.log('conditions', conditions);
  // const validated = conditions.filter(cond => deepequal(cond, formvalues));
  // console.log('formvalues', formvalues);
  // console.log('validated', validated);
  // if (validated.length) return;
  // dispatch(removeField(nextfield.id));
};
