const status = require('../src/health/routes');
const users = require('../src/users/routes');
const home = require('../src/home/routes');
// const validateAuth = require('../middlewares/validateAuth');
// const getData = require('../middlewares/getData');

module.exports = (app) => {
  app.use('/api/v1/status', status);
  app.use('/api/v1/users', users);
  app.use('/', home);
  // app.use('/users', validateAuth.checkIfAuthenticated, getData.getGeoip, users);
  app.use('*', (req, res) => {
    res.send('Not found!!!');
  });
};
