const { celebrate, Segments, Joi } = require('celebrate')

const listCourses = _ => celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()

})

module.exports = { listCourses }