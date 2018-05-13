import createDecorator from 'final-form-calculate';

const initialValues = {
  type: '',
  order: 0,
  title: '',
  display: '',
  description: '',
};

const provider = {
  types: [
    {
      id: 'situations',
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
      id: 'zones',
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
    display: value => (value === 'situations' && 'zones') || '',
  },
});

export const questions = {
  provider,
  validator,
  calculator,
  initialValues,
};

export default questions;
