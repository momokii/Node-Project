exports.getMessageFlash = (flashRequest) => {
    let message = flashRequest
    if(message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    return message
}