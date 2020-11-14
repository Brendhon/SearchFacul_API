const universityAndCourseData = [
    'course.*', //Selecionando todos os dados dos cursos 
    'university.IES',
    'university.email',
    'university.city',
    'university.telephone',
    'university.uf',
    'university.address',
    'university.category',
    'university.site'
]

const universityData = [
    'university.id',
    'university.IES',
    'university.email',
    'university.city',
    'university.telephone',
    'university.uf',
    'university.address',
    'university.category',
    'university.site'
]

module.exports = { universityAndCourseData, universityData }