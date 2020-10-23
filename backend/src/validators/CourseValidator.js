const { celebrate, Segments, Joi } = require('celebrate')

const create = _ => celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(), //Como vários parâmetros são enviados pelo header o "unknown()" serve para descartar os que não foram validados

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(), // Valida que o nome tem que ser uma String e que é requerido (obrigatório)
        email: Joi.string().required().email(), // Valida que tem que ser uma String, obrigatório e se tem formato de email
        description: Joi.string().required(), 
        score: Joi.number().required().min(1).max(5)
    })
})

const list = _ => celebrate({

    [Segments.PARAMS]: Joi.object().keys({
        name: Joi.string().required()
    }),

    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required()
    })
})

const remove = _ => celebrate({

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown() //Como vários parâmetros são enviados pelo header o "unknown()" serve para descartar os que não foram validados

})

module.exports = { create, list, remove }