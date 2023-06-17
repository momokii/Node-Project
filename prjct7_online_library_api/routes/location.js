const router = require('express').Router()
const locationController = require('../controllers/locationController')

// * ----------------------------------- ROUTING -----------------------------------

router.get('/kota/:id_kota', locationController.getKecamatan)

router.get('/provinsi/:id_provinsi', locationController.getKota)

router.get('/provinsi', locationController.getProvinsi)



module.exports = router