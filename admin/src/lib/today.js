const today = () => {
  const now = Date.now();
  const opts = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('fr-FR', opts).format(now);
};

export default today;
