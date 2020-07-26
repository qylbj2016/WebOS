const objToMap = obj => {
    let res = new Map()
    for(let prop in obj){
        res.set(prop, obj[prop])
    }
    return res
}

const objToArr = obj => {
    let res = []
    for( let prop in obj){
        res.push( prop, obj[prop] )
    }
    return res
}
module.exports = {
    objToMap,
    objToArr
}