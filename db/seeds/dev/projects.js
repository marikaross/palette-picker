
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          project_name: 'Pink'}, 'id')
        .then(project => {
          return knex('palettes').insert([
            {palette_name: 'princess', 
            color_1:'#B622AD', 
            color_2: '#BE4BF8', 
            color_3: '#E94DFF', 
            color_4:'#D898CE', 
            color_5: '#CE2D80', 
            project_id: project[0]}
            ])
          })
          .then(() =>  console.log('seeding complete'))
          .catch(error => console.log(`error seeding data: ${error}`))
        ])
    })
    .catch(error => console.log(`error seeding data: ${error}`))
};
