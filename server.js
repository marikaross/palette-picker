const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
//tells which port to use
app.set('port', process.env.PORT || 3000)
//makes it so that our server can parse json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//connects server to static assets
app.use(express.static('public'));



app.get('/', (request, response) => {
  // response.send('hey friend!')
})

//set endpoint for projects
app.get('/api/v1/projects', (request, response) => {
  //specifies which database to accesss
  database('projects').select()
  .then((projects) => {
    //then send a status of 200 (means everything is ok) and send back the projects
    response.status(200).json(projects);
  })
  .catch((error) => {
    //respond with 500 error is there is an issue with the server
    response.status(500).json( {error} ); 
  });
});

//set endpoint for palettes
app.get('/api/v1/palettes', (request, response) => {
  //specifies which database to access
  database('palettes').select()
  .then((palettes) => {
      //then send a status of 200 (means everything is ok) and send back the palettes
    response.status(200).json(palettes);
  })
  .catch((error) => {
    //respond with 500 status error is there is an issue with the server
    response.status(500).json( {error} );
  });
});

//specify end point to which we'll post
app.post('/api/v1/projects', (request, response) => {
  const project = request.body;
  //assigns variable project to the request body (an object with a name and id property)

    for (let requiredParameter of ['project_name']) {
      //set key of project_name as a required parameter
      if (!project[requiredParameter]) {
        //if a required parameter is missing, send a 422 status error with the following message
        return response.status(422).send({ error: `Expected format: { name: <STRING> }. You are missing a "${requiredParameter}" property.`});
      }
    }
  database('projects').insert(project, 'id')
  //if all info is there, insert (add) this project with dtatabase created ID to the database
    .then(project => {
      //send back a 201 status with the id to confirm receipt
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      //respond with 500 status error is there is an issue with the server
      response.status(500).json({ error });
    });
  });

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;
  //assigns variable of palette to request body (what's being sent over the server)

  for (let requiredParameter of ['palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'project_id']) {
    //set keys as required parameters
    if (!palette[requiredParameter]) {
      //if a required parameter is missing, send a 422 error status specifying which keys are missing
      return response.status(422).send({error: `Expected format: {name: <STRING>, color_1: <STRING>, color_2: <STRING>, color_3: <STRING>, color_4: <STRING>, color_5: <STRING>, project_id: <NUMBER>}. You are missing a "${requiredParameter}" property.`});
    }
  }
  database('palettes').insert(palette, 'id')
  //if all info is present add this palette to the palette database
    .then(palette => {
      //send back to 201 status code with the id as response body to confirm reciept of information
      response.status(201).json( { id: palette[0]} )
    })
    .catch(error => {
      //respond with a 500 status code if the server is failing
      response.status(500).json( {error} );
    });
});

//set endpoint for this request
app.get('/api/v1/projects/:id', (request, response) => {
  //identifies which table to pull from and which record piece to look for (id)
  database('projects').where('id', request.params.id).select()
    .then(projects => {
      if (projects.length) {
        //if there are records in the projects table send a 200 with the particular project requested with corresponding id
        response.status(200).json(projects);
      } else {
        //respond with a 404 if there is no record with the id
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      //respond with a 500 status code if there is an issue with the server
      response.status(500).json( {error} );
    });
});

//specifies endpoint for this request
app.get('/api/v1/palettes/:id', (request, response) => {
  //identifies which table to pull form (palettes) and which record peice to look for (id)
  database('palettes').where('id', request.params.id).select()
    .then(palettes => {
      if(palettes.length) {
        //if there are records in the palette table, send a 200 with the id-requested palette as the body
        response.status(200).json(palettes);
      } else {
        //respond with a 404 if there is no record with the requested id
        response.status(404).json({
          error: `Could not find palette with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      //respond with a 500 if there is a server error
      response.status(500).json( {error} )
    });
})

app.delete('/api/v1/palettes/:id', (request, response) => {
  //set endpoint for this request
  //specify table to go to and find the id specified in endpoint
  //use delete CRUD method
  database('palettes').where('id', request.params.id).del()
    .then(palette => {
      if (palette.length) {
        //if there is still info in the palette record return this 404 error message to say request couldn't happen
        response.status(404).json( {error: `Could not find palette with id ${request.params.id}`} )
      } else {
        //send back a response of 200 if palette is deleted
        response.status(200).json(palette) 
      }
    })
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;