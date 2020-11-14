const universityAttributes = (request, response, next) => {

    // Realizando um destruction no objeto vindo da requisição
    const { IES, telephone, uf, city, email, password, address, category, site } = request.body

    // Criando variável para armazenar atributos da universidade
    const universityAttributes = { IES, telephone, uf, city, email, password, address, category, site }

    request.body.universityAttributes = universityAttributes

    return next()

}

module.exports = { universityAttributes }