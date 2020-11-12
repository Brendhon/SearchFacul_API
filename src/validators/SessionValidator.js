const { celebrate, Segments, Joi } = require('celebrate')

const create = _ => celebrate({

    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
})

module.exports = { create }