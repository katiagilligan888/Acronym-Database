exports.up = function(knex, Promise) {
    return knex.schema.createTable('acronyms', tbl => {
        tbl.increments(); 
        tbl.string('name').notNullable(); 
        tbl.string('description'); 
    })
  };
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('acronyms'); 
};