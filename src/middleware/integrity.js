const universityAttributes = (request, response, next) => {

    // Realizando um destruction no objeto vindo da requisição
    const { IES, telephone, uf, city, email, password, address, category, site } = request.body

    // Criando variável para armazenar atributos da universidade
    const universityAttributes = { IES, telephone, uf, city, email, password, address, category, site }

    request.body.universityAttributes = universityAttributes

    return next()

}

const courseAttributes = (request, response, next) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, description, duration, titration, modality, score } = request.body

    // Criando variável para armazenar atributos da universidade
    const courseAttributes = { name, description, duration, titration, modality, score }

    request.body.courseAttributes = courseAttributes

    return next()

}

module.exports = { universityAttributes, courseAttributes }