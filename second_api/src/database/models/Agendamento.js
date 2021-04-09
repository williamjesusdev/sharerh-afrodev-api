"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {}

  Agendamento.init(
    {
      nome_cliente: DataTypes.STRING,
      nome_servico: DataTypes.STRING,
      status: DataTypes.ENUM("agendado", "cancelado"),
      data_agendamento: DataTypes.DATE,
      data_criacao: DataTypes.DATE,
      data_atualizacao: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Agendamento",

      timestamps: true,
      createdAt: "data_criacao",
      updatedAt: "data_atualizacao",
    }
  );
  return Agendamento;
};
