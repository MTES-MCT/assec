import deepequal from 'fast-deep-equal';

// application
import splitObject from './../lib/split-object';
import { FORM_NAME, STEP_INSERT, STEP_REMOVE } from './../constants';

const checkConditions = fieldindex => (dispatch, getState) => {
  const { formfields, form, stepper } = getState();
  const nextindex = fieldindex + 1;
  const nextfield = formfields[nextindex];
  const { conditions: [firstcond] } = nextfield;
  const formvalues = splitObject(form[FORM_NAME].values);
  const hasconditions = formvalues.filter(obj => deepequal(firstcond, obj));
  const validateconditions = hasconditions.length > 0;
  const type = validateconditions ? STEP_INSERT : STEP_REMOVE;
  dispatch({
    type,
    index: nextindex,
  });
};

export default checkConditions;
