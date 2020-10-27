const { celebrate, Segments, Joi } = require('celebrate')

const create = _ => celebrate({

    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
})

module.exports = { create }