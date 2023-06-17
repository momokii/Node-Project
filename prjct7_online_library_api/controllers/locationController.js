const fs = require('fs')
const statusCode = require('../util/status-code').httpStatus_keyValue

// * ----------------------------------- CONTROLLER -----------------------------------

exports.getProvinsi = async (req, res, next) => {
    try{
        const prov_path = "./static/daerah/provinsi.json"
        const prov = JSON.parse(fs.readFileSync(prov_path, 'utf-8'))

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get Province Data",
            data: prov
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getKota = async (req, res, next) => {
    try{
        const kode_provinsi = req.params.id_provinsi
        const kota_path = `./static/daerah/kabupaten/${kode_provinsi}.json`
        const kota = JSON.parse(fs.readFileSync(kota_path, 'utf-8'))

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get Kota Data",
            data: kota
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getKecamatan = async (req, res, next) => {
    try{
        const kode_kota = req.params.id_kota
        const kecamatan_path = `./static/daerah/kecamatan/${kode_kota}.json`
        const kecamatan = JSON.parse(fs.readFileSync(kecamatan_path, 'utf-8'))

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get Kecamatan Data",
            data: kecamatan
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}