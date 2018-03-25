import deepequal from 'fast-deep-equal';

// application
import splitObject from './../lib/split-object';
import { FORM_NAME, STEP_INSERT, STEP_REMOVE } from './../constants';

const checkConditions = fieldindex => (dispatch, getState) => {
  const { formfields, form } = getState();
  const nextindex = fieldindex + 1;
  const nextfield = formfields[nextindex];
  // FIXME -> use an array of conditions to validate with and/or
  // si une conditions est remplie on affiche la prochaine étape
  // sinon on l'ajouter dans un array d'étapes à ne pas afficher
  const { conditions: [firstcond] } = nextfield;
  const formvalues = splitObject(form[FORM_NAME].values);
  const validconditions = formvalues.filter(obj => deepequal(firstcond, obj));
  const type = validconditions.length > 0 ? STEP_INSERT : STEP_REMOVE;
  dispatch({
    type,
    index: nextindex,
  });
};

export default checkConditions;
