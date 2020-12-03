const { celebrate, Segments, Joi } = require('celebrate')

const create = _ => celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(), //Como vários parâmetros são enviados pelo header o "unknown()" serve para descartar os que não foram validados

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(), // Valida que o nome tem que ser uma String e que é requerido (obrigatório)
        description: Joi.string().required(),
        duration: Joi.number().required(),
        titration: Joi.string().required(),
        modality: Joi.string().required(),
        period: Joi.string().required(),
        score: Joi.number().min(1).max(5)
    })
})

const list = _ => celebrate({

    [Segments.PARAMS]: Joi.object().keys({
        option: Joi.string().required()
    }),

    [Segments.QUERY]: Joi.object().keys({
        text: Joi.string().required()
    })
})

const listByID = _ => celebrate({

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
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

const update = _ => celebrate({

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(), //Como vários parâmetros são enviados pelo header o "unknown()" serve para descartar os que não foram validados

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(), // Valida que o nome tem que ser uma String e que é requerido (obrigatório)
        description: Joi.string(),
        duration: Joi.number(),
        titration: Joi.string(),
        modality: Joi.string(),
        period: Joi.string(),
        score: Joi.number().default(null)
    })
})

module.exports = {
    create,
    list,
    listByID,
    remove,
    update
}