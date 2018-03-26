import deepequal from 'fast-deep-equal';
import { getFormValues } from 'redux-form';

// application
// import splitObject from './../lib/split-object';
import { FORM_NAME, STEP_INSERT, STEP_REMOVE } from './../constants';

const formValues = (state) => {
  const values = getFormValues(FORM_NAME)(state);
  // splitObject(values);
  return Object.keys(values).reduce(
    (acc, key) => Object.assign({}, acc, { [key]: values[key].choice }),
    {},
  );
};

const validRequires = (aobj, obj) => {
  aobj.map((obj) => {});
};

const checkRequires = () => (dispatch, getState) => {
  const state = getState();
  const { fields } = state.steppedform;
  const choices = formValues(state);
  const validator = fields.map(({ requires }) => {
    // le flag false indique qu'aucune requires ne s'applique au champs
    if (requires === false) return true;
    const fitrequires = validRequires(requires, choices);
    return fitrequires;
    // return deepequal(requires[0] || {}, {});
  });
  console.log('validator', validator);

  /*
  // FIXME -> use an array of requires to validate with and/or
  // si une requires est remplie on affiche la prochaine étape
  // sinon on l'ajouter dans un array d'étapes à ne pas afficher
  const { requires } = nextfield;
  // si le champs requires du JSON est false
  // on autorise toujours la visibilité du champs
  const hasnocondition = requires === false;
  const choices = getArrayValues(state);
  const validrequires = choices.filter(obj =>
    deepequal(requires[0] || {}, obj));
  const type =
    hasnocondition || validrequires.length > 0 ? STEP_INSERT : STEP_REMOVE;
  dispatch({
    type,
    index: nextindex,
  });
  */
};

export default checkRequires;
