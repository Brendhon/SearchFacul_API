const { celebrate, Segments, Joi } = require('celebrate')

const sessionPost = _ => celebrate({

    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
})

module.exports = { sessionPost }