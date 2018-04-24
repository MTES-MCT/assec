export const validatesuos = (suos) => {
  // vérifie que tous les champs validations
  // contiennent au moins une valeur
  const results = Object.keys(suos).filter(key => suos[key].length > 0);
  return results.length === 3;
};

export const parsesuos = suos =>
  // FIXME -> a deplacer dans un utils
  // transforme les valeurs SUOS du formulaire
  // pour etre exploitable par graphql { value } -> { label }
  Object.keys(suos).reduce((acc, key) => {
    const dest = suos[key].map(({ value: label }) => ({ label }));
    return Object.assign({}, acc, { [key]: dest });
  }, {});
