import DeletePopin from './../components/ui/popins/DeletePopin';

export const openPopin = opts => ({
  type: 'onOpenPopin',
  options: Object.assign({}, opts),
});

export const openDeletePopin = opts =>
  openPopin({ ...opts, Type: DeletePopin });
