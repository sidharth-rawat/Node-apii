const express = require('express');
const staff_router =  express.Router();
const staffAuthMiddleware = require('../middleware/auth_middleware');
const staff_controller = require('../controller/staff_controller');

staff_router.get('/all', staffAuthMiddleware, staff_controller.staffGet);

module.exports = staff_router;