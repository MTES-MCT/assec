export const pagetitle = (routes, currentpath) =>
  routes.main.concat(routes.sub).filter(obj => obj.path === currentpath)[0]
    .name;

export default pagetitle;
