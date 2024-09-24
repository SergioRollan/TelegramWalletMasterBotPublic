const Idiomas = {
    spanish: 0,
    english: 1,
    esUnIdioma: function(lg) {return lg==Idiomas.english || lg==Idiomas.spanish;},
}

module.exports = {
    Idiomas
}