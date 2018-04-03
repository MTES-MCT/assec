export const loadPerson = () => (dispatch) => {
  dispatch({ type: 'onPersonLoadStart' });
  const uri = 'http://fortunecookieapi.herokuapp.com/v1/cookie';
  fetch(uri)
    .then(resp => resp.json())
    .then((persons) => {
      console.log('persons', persons);
      dispatch({ type: 'onPersonLoadComplete', persons: [] });
    })
    .catch(() => {});
};

export default loadPerson;
