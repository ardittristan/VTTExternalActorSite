module.exports = function(value, options) {
    
    // Helper parameters
    let dec = (options.hash['decimals'] !== undefined) ? options.hash['decimals'] : 0,
        sign = options.hash['sign'] || false;

    // Parse to float
    value = parseFloat(value).toFixed(dec);

    // Attach sign
    if (sign) {
        return (value >= 0) ? "+" + value : value;
    } else {
        return value;
    }
}