const datas = require('./../french_departments.json');

export const departments = {
  get: {
    name: (code) => {
      const [obj] = datas.filter(o => o.departmentCode === code);
      return (obj && obj.departmentName) || '';
    },
  },
  omit: (loaded) => {
    const codes = (loaded && loaded.map(({ code }) => code)) || [];
    return datas.filter(({ departmentCode }) => !codes.includes(departmentCode));
  },
  pick: (loaded) => {
    const codes = loaded.map(({ code }) => code);
    return datas.filter(({ departmentCode }) => codes.includes(departmentCode));
  },
  all: () => ({ ...datas }),
};

export default departments;
