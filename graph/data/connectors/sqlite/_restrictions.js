import Sequelize from 'sequelize';

const initModel = db =>
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

export default { initModel };
