export const popin = (state = null, action) => {
  switch (action.type) {
  case 'onOpenPopin':
    return { ...action.options };
  case 'onClosePopin':
    return null;
  default:
    return state;
  }
};

export default popin;
