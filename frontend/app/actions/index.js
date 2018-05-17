export const subWarning = () => ({
  status: 'warning',
  type: 'onSubscriptionStatus',
  message: 'Votre requête prend un peu de temps veuillez patienter',
});

export const subError = () => ({
  status: 'error',
  type: 'onSubscriptionStatus',
  message: 'Une erreur est survenue veuillez réessayer ultérieurement',
});

export const subSuccess = () => ({
  status: 'success',
  type: 'onSubscriptionStatus',
  message: "Vous êtes désormais inscrit à notre système d'alerte",
});

export const subClose = () => ({
  status: null,
  message: null,
  type: 'onSubscriptionStatus',
});

export const closePopin = () => ({
  type: 'onClosePopin',
});

export const openPopin = () => ({
  type: 'onOpenPopin',
});
