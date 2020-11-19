let _id = 0

function generateUniqueId() {
    return _id++
}

export {generateUniqueId}