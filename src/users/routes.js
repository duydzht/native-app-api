const express = require('express');

const controller = require('./controller/index');
const validateSchemas = require('../../middlewares/validateSchemas');
const schemas = require('./utils/schemasValidation');

const router = express.Router();

router.post(
  '/signup',
  validateSchemas.inputs(schemas.signUp, 'body'),
  (req, res) => {
    controller.signUp(res, req.body);
  }
);

router.post('/login', (req, res) => {
  controller.login(req, res);
});

module.exports = router;
