const toFixed = (num, fixed) => {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?')
    var truncatedVal = num.toString().match(re)[0]
    if (fixed == 2){
        if (truncatedVal.lastIndexOf('.') === -1) return truncatedVal + '.00'
        if (truncatedVal.length - truncatedVal.lastIndexOf('.') == 2) return truncatedVal + '0'
    }
    return truncatedVal
}

export default toFixed
