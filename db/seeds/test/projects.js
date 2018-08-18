
exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then( () => knex('projects').del())
    .then( () => {
      return Promise.all([

          knex('projects').insert({
            project_name: 'Party Time'
          }, 'id')
          .then( project => {
            return knex('palettes').insert([
              { palette_name: 'best', color_1: '#30E8A7', color_2: '#FC68D1', color_3: '#A0CE39', color_4: '#D5E403', color_5: '#819ADD', project_id: project[0] },
              { palette_name: 'so good', color_1: '#30E8A7', color_2: '#FC68D1', color_3: '#A0CE39', color_4: '#D5E403', color_5: '#819ADD', project_id: project[0] }
            ])
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
        ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};