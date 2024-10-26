module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Attachments', {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
          },
          fileUrl: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          TaskId: {
              type: Sequelize.INTEGER,
              references: {
                  model: 'Tasks', // Вказуйте назву таблиці
                  key: 'id'
              },
              onDelete: 'CASCADE'
          },
          createdAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.NOW,
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: true,
          }
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Attachments');
  }
};
