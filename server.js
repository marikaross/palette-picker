const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));



app.get('/', (request, response) => {
  // response.send('hey friend!')
})

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
  .then((projects) => {
    response.status(200).json(projects);
  })
  .catch((error) => {
    response.status(500).json( {error} ); 
  });
});

app.get('app/v1/palettes', (request, response) => {
  database('palettes').select()
  .then((palettes) => {
    response.status(200).json(palettes);
  })
  .catch((error) => {
    response.status(500).json( {error} );
  });
});


app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

    for (let requiredParameter of ['project_name']) {
      if (!project[requiredParameter]) {
        return response.status(422).send({ error: `Expected format: { name: <STRING> }. You are missing a "${requiredParameter}" property.`});
      }
    }
  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
  });

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  for (let requiredParameter of ['palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'project_id']) {
    if (!palette[requiredParameter]) {
      return response.status(422).send({error: `Expected format: {name: <STRING>, color_1: <STRING>, color_2: <STRING>, color_3: <STRING>, color_4: <STRING>, color_5: <STRING>, project_id: <NUMBER>}. You are missing a "${requiredParameter}" property.`});
    }
  }
  database('palettes').insert(palette, 'id')
    .then(palette => {
      response.status(201).json( { id: palette[0]} )
    })
    .catch(error => {
      response.status(500).json( {error} );
    });
});

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json( {error} );
    });
});

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('project_id', request.params.id).select()
    .then(palettes => {
      if(palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json( {error} )
    });
})

// app.delete('/api/v1/palettes/:id', (request, response) => {
//   database('palettes').where('id', request.params.id).select()
//     .then(palette => {
//       if (palette.length) {
//         response.status(204).del()
//       } else {
//         response.status(404).json( {
//           error: `Could not find palette with id ${request.params.id}`
//         });
//       }
//     })
// })



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});