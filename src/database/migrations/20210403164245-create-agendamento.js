"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "agendamentos",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nome_cliente: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: [5, 50],
          },
        },
        status: {
          type: Sequelize.ENUM("agendado", "cancelado"),
          allowNull: false,
        },
        data_agendamento: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        data_criacao: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        data_atualizacao: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        createdAt: "data_criacao",
        updatedAt: "data_atualizacao",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("agendamentos");
  },
};
