'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/subscribe', controller.subscribe.save);
  router.get('/subscribe/:uuid', controller.subscribe.find);
  router.post('/subscribe/push/:uuid', controller.subscribe.push);
};
