import { getFormValues } from 'redux-form';

// application
import has from './../lib/has';
import { FORM_NAME, STEP_DISABLED } from './../constants';

const formValues = (state) => {
  const values = getFormValues(FORM_NAME)(state);
  // splitObject(values);
  return Object.keys(values).reduce(
    (acc, key) => Object.assign({}, acc, { [key]: values[key].choice }),
    {},
  );
};

const validate = (requires, choices) => {
  const rules = Object.assign({}, requires);
  const ruleskeys = Object.keys(rules);
  // est ce que toutes les cles dans la regles sont valides ?
  const validated = ruleskeys
    .map((key) => {
      // si pas de cle dans le choix utilisateur -> false
      // const contains = has(choices, key);
      // if (!contains) return false;
      if (rules[key] === '*') return true;
      return rules[key] === choices[key];
    })
    .filter(v => v);
  // test d'egalite
  // -> il est valide uniquement toutes les valeurs sont true (and)
  // -> pour le "or" il faut juste tester si une valeur est valide
  return validated.length === ruleskeys.length;
};

const checkRequires = () => (dispatch, getState) => {
  const state = getState();
  const { fields } = state.steppedform;
  const choices = formValues(state);
  const disabled = fields
    .map(({ requires }) => {
      // le flag false indique qu'aucune requires ne s'applique au champs
      // donc le champs ne doit pas être disabled
      if (requires === false) return false;
      return !validate(requires, choices);
    })
    .reduce((acc, bool, index) => (!bool ? acc : acc.concat([index])), []);
  dispatch({
    disabled,
    type: STEP_DISABLED,
  });
};

export default checkRequires;
