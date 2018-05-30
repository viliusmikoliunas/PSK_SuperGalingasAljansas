const toFixed = (num, fixed) => {
    if (num == NaN || num == null) return 0
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?')
    const pos = num.toString().match(re)
    if (pos == null) return 0
    const truncatedVal = pos[0]
    if (fixed == 2){
        if (truncatedVal.lastIndexOf('.') === -1) return truncatedVal + '.00'
        if (truncatedVal.length - truncatedVal.lastIndexOf('.') == 2) return truncatedVal + '0'
    }
    return truncatedVal
}

export default toFixed
