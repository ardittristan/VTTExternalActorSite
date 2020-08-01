RegExp.escape= function(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

module.exports = function (selected, options) {
    const escapedValue = RegExp.escape(Handlebars.escapeExpression(selected));
    const rgx = new RegExp(' value=\"' + escapedValue + '\"');
    const html = options.fn(this);
    return html.replace(rgx, "$& selected");
};