export const today = () =>
  new Date().toLocaleDateString('fr-FR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
  });

export default today;
