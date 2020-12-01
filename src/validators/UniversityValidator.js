const { celebrate, Segments, Joi } = require('celebrate')

const create = _ => celebrate({

    [Segments.BODY]: Joi.object().keys({
        IES: Joi.string().required(), // Valida que o nome tem que ser uma String e que é requerido (obrigatório)
        telephone: Joi.string().trim().regex(/^[0-9]{8,11}$/).required(), // Validando se são números com limite de caracteres de 8 a 11
        email: Joi.string().email().required(), // Valida que tem que ser uma String, obrigatório e se tem formato de email
        password: Joi.string().required(),
        uf: Joi.string().trim().regex(/^[A-Z]{2,2}$/).required(), // Validando se o UF tem duas letras maiúsculas e epenas 2 letras
        city: Joi.string().required(),
        address: Joi.string().required(),
        category: Joi.string().required(),
        site: Joi.string().uri()
    })
})

const remove = _ => celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown() //Como vários parâmetros são enviados pelo header o "unknown()" serve para descartar os que não foram validados

})

const list = _ => celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown() //Como vários parâmetros são enviados pelo header o "unknown()" serve para descartar os que não foram validados

})

const update = _ => celebrate({

    [Segments.BODY]: Joi.object().keys({
        IES: Joi.string(), // Valida que o nome tem que ser uma String e que é requerido (obrigatório)
        telephone: Joi.string().trim().regex(/^[0-9]{8,11}$/), // Validando se são números com limite de caracteres de 8 a 11
        email: Joi.string().email(), // Valida que tem que ser uma String, obrigatório e se tem formato de email
        password: Joi.string(), // Valida que tem que ser uma String, obrigatório e se tem formato de email
        uf: Joi.string().trim().regex(/^[A-Z]{2,2}$/), // Validando se o UF tem duas letras maiúsculas e epenas 2 letras
        city: Joi.string(),
        address: Joi.string(),
        category: Joi.string(),
        site: Joi.string().uri()
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown() //Como vários parâmetros são enviados pelo header o "unknown()" serve para descartar os que não foram validados
})

module.exports = { create, remove, list, update }