if ( ! Number.prototype.formatPrice) {
Number.prototype.formatPrice = function(currency = 'EUR', lang = 'gd-GB'){
      return this.toLocaleString(lang, { style: 'currency', currency: currency });
 }
}

module.exports = "Number.prototype.formatPrice"
