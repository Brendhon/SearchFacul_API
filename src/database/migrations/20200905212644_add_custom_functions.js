const REMOVE_ACCENTUATION = `
CREATE OR REPLACE FUNCTION REMOVE_ACCENTUATION(p_texto text)  
RETURNS text AS  
$BODY$  
Select translate($1,  
'áàâãäåaaaÁÂÃÄÅAAAÀéèêëeeeeeEEEÉEEÈìíîïìiiiÌÍÎÏÌIIIóôõöoooòÒÓÔÕÖOOOùúûüuuuuÙÚÛÜUUUUçÇñÑýÝ',  
'aaaaaaaaaAAAAAAAAAeeeeeeeeeEEEEEEEiiiiiiiiIIIIIIIIooooooooOOOOOOOOuuuuuuuuUUUUUUUUcCnNyY'   
);  
$BODY$  
LANGUAGE sql VOLATILE  
COST 100;  
`

const DROP_REMOVE_ACCENTUATION = `DROP FUNCTION REMOVE_ACCENTUATION(p_texto text)`

exports.up = async function (knex) {
    return knex.raw(REMOVE_ACCENTUATION)
}

exports.down = async function (knex) {
    return knex.raw(DROP_REMOVE_ACCENTUATION)
}