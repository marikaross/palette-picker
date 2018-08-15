const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.locals.title = "Palette Picker";

app.locals.projects = [{
  name: 'a-ha',
  id: 1,
  palettes: [{
    name: 'take on me', 
    id: 1, 
    colors: ['#B622AD', '#BE4BF8', '#E94DFF', '#D898CE', '#CE2D80']
  }]
},
{
  name: 'wham!',
  id: 2,
  palettes: [{
    name: 'wake me up', 
    id: 1, 
    colors: ['#B622AD', '#BE4BF8', '#E94DFF', '#D898CE', '#CE2D80']
  }]
}];

app.get('/', (request, response) => {
  // response.send('hey friend!')
})

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;
  response.json({projects})
})

app.get('/api/v1/palette/:project_id', (request, response) => {

})

app.post('/api/v1/projects', (request, response) => {
  // const id = Date.now();
  // const { project } = request.body;

  // app.locals.projects.push(project);
  // response.status(201).json({id, project.id})
})

app.post('api/v1/palette', (request, response) => {

})

app.delete('api/v1/palette', (request, response) => {

})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});