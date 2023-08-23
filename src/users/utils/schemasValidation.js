const Joi = require('@hapi/joi');

const schemas = {
  signUp: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
    address: Joi.string().required(),
  }),
  login: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = schemas;
