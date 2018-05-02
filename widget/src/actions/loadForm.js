import questions from './../datas/questions.json';
import { capitalize } from './../core/utils/capitalize';

import { FIELDS_LOADED } from './../constants';
import { HYDRATE_DEPARTMENT } from './../apolloql';

const MOCK_DEPARTEMENT_ID = '5ad84a9f73150f000eeaf0d0';

export const loadForm = client => (dispatch) => {
  client
    .query({
      query: HYDRATE_DEPARTMENT,
      variables: { department: MOCK_DEPARTEMENT_ID },
    })
    .then(({ data: { hydrateDepartment } }) => {
      const fields = questions
        .map((question) => {
          if (!hydrateDepartment[question.id]) return false;
          // console.log('question.id', question.id);
          const values =
            hydrateDepartment[question.id].map(value =>
              // console.log('value', value.__typename);
              ({
                id: value.id,
                order: value.order || 0,
                // FIXME -> doit pas etre capitalized ici
                // mais depuis la base de donnees ou l'input user
                label: capitalize(value.label.trim()),
                // FIXME -> doit pas etre parse en JSON ici
                // mais depuis la base de donnees
                geojson: (value.geojson && JSON.parse(value.geojson)) || false,
              })) || [];
          return { ...question, values };
        })
        .filter(v => v);
      dispatch({ type: FIELDS_LOADED, fields });
    });
};

export default loadForm;
