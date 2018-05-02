import questions from './../datas/questions.json';
import { capitalize } from './../core/utils/capitalize';

import { FIELDS_LOADED } from './../constants';
import { HYDRATE_DEPARTMENT } from './../apolloql';

const MOCK_DEPARTEMENT_ID = '5ad84a9f73150f000eeaf0d0';

const parseZoneType = ({ label, geojson, ...rest }) =>
  Object.assign(
    {},
    { ...rest },
    {
      // FIXME -> doit pas etre capitalized ici
      // mais depuis la base de donnees ou l'input user
      label: capitalize(label.trim()),
      // FIXME -> doit pas etre parse en JSON ici
      // mais depuis la base de donnees
      geojson: (geojson && JSON.parse(geojson)) || false,
    },
  );

const parseSUOType = ({ id, label }) =>
  Object.assign({
    id,
    // FIXME -> doit pas etre capitalized ici
    // mais depuis la base de donnees ou l'input user
    label: capitalize(label.trim()),
  });

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
          const values =
            hydrateDepartment[question.id]
              .map((value) => {
                // eslint-disable-next-line
                const type = value.__typename;
                switch (type) {
                case 'SUOType':
                  return parseSUOType(value);
                case 'ZoneType':
                  return parseZoneType(value);
                default:
                  return null;
                }
              })
              .filter(v => v) || [];
          return { ...question, values };
        })
        .filter(v => v);
      dispatch({ type: FIELDS_LOADED, fields });
    });
};

export default loadForm;
