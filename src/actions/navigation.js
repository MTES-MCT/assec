import { reset } from 'redux-form';

// application
import Constants from './../constants';

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

export const stepBackward = () => (dispatch, getState) => {
  const { activestep, fields, disabledfields } = getState();
  const filtered = fields
    .map((obj, index) => {
      // si index est superieur
      const isdown = index < activestep;
      // si index est pas inclus dans les etapes desactivees
      const notindexed = isdown && !disabledfields.includes(index);
      return notindexed ? index : false;
    })
    .filter(v => v !== false);
  filtered.reverse();
  return dispatch({
    type: 'onStepForwardTo',
    // max value pour les résultats
    // FIXME -> risque de planter à un moment
    index: filtered[0] || 0,
  });
};

export const stepReset = () => (dispatch, getState) => {
  const { defaultfields } = getState();
  // FIXME -> see reducers for perfomances
  // instead of JSON.stringify use deepclone ?
  dispatch({
    type: 'onFormReset',
    fields: JSON.parse(defaultfields),
  });
  dispatch(reset(Constants.FORM_NAME));
};
