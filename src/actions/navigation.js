import Constants from './../constants';

export const stepReset = () => ({
  type: 'onStepReset',
});

export const stepForward = () => ({
  type: 'onStepForward',
});

export const stepBackward = () => ({
  type: 'onStepBackward',
});

export const stepForwardTo = () => (dispatch, getState) => {
  const { form, activestep, fields } = getState();
  const nextfield = fields[activestep];
  const { defaultvalue, conditions } = nextfield;
  const formvalues = form[Constants.FORM_NAME].values;
  console.log('formvalues', formvalues);
  console.log('conditions', conditions);
  console.log('defaultvalue', defaultvalue);
};

// componentWillReceiveProps (nextprops) {
//   const { current } = this.state;
//   const { activestep, formvalues } = nextprops;
//   if (!activestep || activestep === current) return;
//   const { fields } = nextprops;
//   const { conditions, defaultvalue } = fields[activestep];
//   const validated = conditions.filter(cond => deepequal(cond, formvalues));
//   if (validated.length) return;
//   const nextstep = activestep + 1;
//   this.setState({ current: nextstep }, () => {
//     this.props.array.push(...defaultvalue);
//     this.props.dispatch(stepForwardTo(nextstep));
//   });
// }
