import deepequal from 'fast-deep-equal';

// application
import Constants from './../constants';
import splitObject from './../lib/split-object';

const checkConditions = () => (dispatch, getState) => {
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

export default checkConditions;
