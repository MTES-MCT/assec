import Sequelize from 'sequelize';

const initModel = db =>
  db.define('departement', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
    },
    code: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },
  });

export default { initModel };
