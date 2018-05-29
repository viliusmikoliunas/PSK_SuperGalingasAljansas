const toFixed = (num, fixed) => {
    if (num == NaN || num == null) return 0
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?')
    var truncatedVal = num.toString().match(re)[0]
    if (fixed == 2){
        if (truncatedVal.lastIndexOf('.') === -1) return truncatedVal + '.00'
        if (truncatedVal.length - truncatedVal.lastIndexOf('.') == 2) return truncatedVal + '0'
    }
    return truncatedVal
}

export default toFixed
