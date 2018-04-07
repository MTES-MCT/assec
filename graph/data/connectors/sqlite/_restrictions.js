import Sequelize from 'sequelize';

export const restrictionModel = {
  init: (db) => {
    db.define('restriction', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      departement: { type: Sequelize.UUID },
      description: { type: Sequelize.STRING },
      informations: { type: Sequelize.STRING },
    });
  },
};

export default restrictionModel;
