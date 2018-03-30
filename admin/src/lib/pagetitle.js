export const pagetitle = (routes, currentpath) =>
  routes.filter(obj => obj.path === currentpath)[0].name;

export default pagetitle;
