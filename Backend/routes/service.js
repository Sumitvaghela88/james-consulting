// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  searchServices
} = require('../controllers/serviceController');

// Search route (must be before /:id route)
router.get('/search', searchServices);

// Get all services & Create new service
router.route('/')
  .get(getAllServices)
  .post(createService);

// Get, Update, Delete single service
router.route('/:id')
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService);

module.exports = router;