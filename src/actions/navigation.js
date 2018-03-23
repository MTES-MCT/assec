import { reset } from 'redux-form';
import deepequal from 'fast-deep-equal';

// application
import Constants from './../constants';
import splitObject from './../lib/splitObject';

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
  // on recupere la prochaine étape que le formulaire doit afficher normalement
  const { conditions } = nextfield;
  if (!conditions || !conditions.length) return;
  // FIXME -> un array doit valider plusieurs conditions
  const firstcond = conditions[0];
  // on recupere les valeurs du form
  // on splitte les cles pour en faire un array
  const formvalues = splitObject(form[Constants.FORM_NAME].values);

  // on verifie
  // si le formulaire contient au moins une clé de condition
  const hasconditions = formvalues.filter(obj => deepequal(firstcond, obj));
  // si aucun des objets ne sont pas égaux a la condition
  // alors on doit sauter une étape
  // sinon on fait rien
  const valideconditions = hasconditions.length > 0;
  if (valideconditions) return;
  dispatch(removeField(nextfield.id));
};
