import { FIND_RESTRICTION_BY_CRITERIAS } from './../apolloql';
import { FORM_SUBMIT } from './../constants';

const MOCK_DEPARTEMENT_ID = '5ad84a9f73150f000eeaf0d0';

export const formSubmit = (client, values) => (dispatch) => {
  const choices = Object.keys(values).reduce(
    (acc, key) => Object.assign({}, acc, { [key]: values[key].choice }),
    { department: MOCK_DEPARTEMENT_ID },
  );
  client
    .query({
      query: FIND_RESTRICTION_BY_CRITERIAS,
      variables: choices,
    })
    .then(({ data }) => {
      dispatch({
        type: FORM_SUBMIT,
        result: {
          choices: Object.assign({}, values),
          values: data.findRestictionByCriteria,
        },
      });
    });
};

export default formSubmit;
