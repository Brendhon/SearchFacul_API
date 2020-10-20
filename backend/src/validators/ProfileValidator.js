const { celebrate, Segments, Joi } = require('celebrate')

const profilePost = _ => celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown() //Como vários parâmetros são enviados pelo header o "unknown()" serve para descartar os que não foram validados

})

module.exports = { profilePost }