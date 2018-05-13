import createDecorator from 'final-form-calculate';

const initialValues = {
  type: '',
  title: '',
  display: '',
  description: '',
};

const provider = {
  types: [
    {
      id: 'zones',
      label: 'Zones',
    },
    {
      id: 'usages',
      label: 'Usages',
    },
    {
      id: 'origines',
      label: 'Origines',
    },
  ],

  displays: [
    {
      id: 'list',
      label: 'Liste',
    },
    {
      id: 'choice',
      label: 'Choix',
    },
    {
      id: 'map_with_zone',
      label: 'Carte avec zones',
    },
  ],
};

const validator = (values) => {
  // valide que les valeurs du formulaire
  // sont OK avec ce que l'on attend
  const errors = {};
  if (!values.type || values.type === '') {
    errors.type = 'Required';
  }
  if (!values.display || values.display === '') {
    errors.display = 'Required';
  }
  if (!values.title || values.title === '') {
    errors.title = 'Required';
  }
  return errors;
};

const calculator = createDecorator({
  // permet de calculer une valeur en fonction d'une autre
  field: 'type',
  updates: {
    // ici c'est le code du département
    // qui permet de récupérer son nom dans la liste
    // prédéfinies des departements.json
    display: value => (value === 'zones' && 'map_with_zone') || '',
  },
});

export const questions = {
  provider,
  validator,
  calculator,
  initialValues,
};

export default questions;
