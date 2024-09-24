const Monedas = {
    euro: "€",
    libra: "£",
    dolar: "$",
    yen: "¥",
    esUnaMoneda: function(lg) {return lg==Monedas.dolar || lg==Monedas.euro || lg==Monedas.libra || lg == Monedas.yen;},
}

module.exports = {
    Monedas
}