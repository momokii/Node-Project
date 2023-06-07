const { Storage } = require('@google-cloud/storage')
const storage = new Storage({ keyFilename: './cloud_storage_key.json' })
const bucket = storage.bucket('coret1-test')
const statusCode = require('../util/response').httpStatus_keyValue
const crypto = require('crypto')
const fileProcess = require('../middleware/process-file')

// * -------------------- CONTROLLER --------------------

exports.getFile = async (req, res, next) => {
    try{
        const folderPath = req.query.file_path

        // * jadi akan balikan [files] -> misal jika tanpa [] files akan kemungkinan balikan array [file1, file2, file-n] maka dengan -> [files] nilai diambil akan === file1 di dalam array
        let [files] = await bucket.getFiles({prefix: folderPath})
        let data_file = []

        files.forEach(file => {
            data_file.push({
                file_path: file.name,
                file_type: file.metadata.contentType,
                download_url: file.metadata.mediaLink,
                public_url: `https://storage.googleapis.com/${bucket.name}/${file.name}`
            })
        })

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get File Data from Cloud Storage',
            data: {
                total_data: data_file.length,
                file_data: data_file
            }
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.uploadFile = async (req, res, next) => {
    try{
        await fileProcess(req, res)

        if(!req.file){
            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: 'File is Empty'
            })
        }

        //* Get Req Body Data
        const path = req.body.path
        const custom_name = req.body.name.toString().trim()
        let filename = req.file.originalname

        if(req.query.random_filename === 'true' || custom_name ){
            const filename_extension = filename.split('.')
            const extension = filename_extension[filename_extension.length - 1]

            let name = crypto.randomBytes(4).toString('hex')
            if(custom_name){
                name = custom_name
            }

            filename = name + '.' + extension
        }

        // * path folder file on cloud storage
        let filepath = path + '/' + filename
        if(!path){
            filepath = filename
        }

        // * ------------ ------------ UPLOAD PROCESS & CONFIG ------------ ------------
        const blob = bucket.file(filepath) //*? create blob/object on cloud storage filepath

        const blobStream = blob.createWriteStream({
            resumable: false
        }) //* create/config write stream process when upload buffer data

        // *! write stream process config situation
        //* when error
        blobStream.on('error', (err) => {
            return res.status(statusCode['500_internal_server_error']).json({
                errors: true,
                message: err.message
            })
        })

        //* when finish
        blobStream.on('finish', data => {
            const public_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`

            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: 'Success Upload to Cloud Storage',
                data: {
                    public_url: public_url
                }
            })
        })

        // * upload process and choose file uploaded within writeStream
        blobStream.end(req.file.buffer)

        // * ------------ ------------ ------------ ------------ ------------ ------------

    } catch (e) {
        //* if file > MAX SIZE
        if(e.code == "LIMIT_FILE_SIZE"){
            e.statusCode = statusCode['413_payload_too_large']
            e.message = "File too Large, Max Size is 2MB"
        }

        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteFile = async (req, res, next) => {
    try{
        const response = {
            errors: false,
            message: 'Success Delete File from Cloud Storage'
        }

        const filepath = req.body.file_path
        const [files] = await bucket.getFiles({prefix : filepath})
        const files_length = files.length //* hitung file ditemukan
        if(files_length !== 1){
            if(files_length < 1){
                response.message = 'File not Found'
            } else {
                response.message = 'Multiple files found. Please provide a more specific file_path'
            }

            return res.status(statusCode['200_ok']).json(response)
        }

        await bucket.file(filepath).delete()

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}