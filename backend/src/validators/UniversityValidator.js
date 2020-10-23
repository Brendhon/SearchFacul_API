const { celebrate, Segments, Joi } = require('celebrate')

const universityPost = _ => celebrate({

    [Segments.BODY]: Joi.object().keys({
        universityName: Joi.string().required(), // Valida que o nome tem que ser uma String e que é requerido (obrigatório)
        telephone: Joi.string().trim().regex(/^[0-9]{8,11}$/).required(), // Validando se são números com limite de caracteres de 8 a 11
        uf: Joi.string().trim().regex(/^[A-Z]{2,2}$/).required(), // Validando se o UF tem duas letras maiúsculas e epenas 2 letras
        city: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.number().required()
    })
})

const universityDelete = _ => celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown() //Como vários parâmetros são enviados pelo header o "unknown()" serve para descartar os que não foram validados

})

module.exports = { universityPost, universityDelete }