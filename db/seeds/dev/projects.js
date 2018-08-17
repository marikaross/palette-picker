
exports.seed = function(knex, Promise) {
  return knex('palletes').del()
    .then( () => knex('projects').del())
    .then( () => {
      return Promise.all([

          knex('projects').insert({
            name: 'Party Time'
          }, 'id')
          .then( project => {
            return knex('palletes').insert([
              { palette_name: 'best', color_1: '#015', color_2: '#152', color_3: '#233', color_4: '#222', color_5: '#232', project_id: project[0] }
            ])
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
        ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};