const Multer = require('multer')
const util = require('util')
const MAX_FILE_SIZE = 2 * 1024 * 1024

let processFile = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE
    }
}).single('file')

const processFileMiddleware = util.promisify(processFile)

module.exports = processFileMiddleware