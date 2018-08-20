$('.palette').on('click', makePalette);
$('.lock').on('click', toggleLock);
$('.save').on('click', savePalette);
$('.save-project').on('submit', saveProject);
$('.save-palette').on('submit', savePalette);
$('.saved-projects').on('click', '.delete', deletePalette);
$('.saved-projects').on('click', '.mini-color', makeItBig)


$(window).on('load', welcome);

var colors = []

function welcome() {
  makePalette()
  getProjects()
}



function getAColor() {
  var hex = '0123456789ABCDEF',
  color = '#', i;
  for (i = 0; i < 6 ; i++) {
    color = color + hex[Math.floor(Math.random() * 16)];
    }
  return color;
}

function makePalette() {
  for (var i = 1; i < 6; i++) {
    if(!$(this).children(`.color${[i]}`).hasClass('.locked-color')) {
      var color = getAColor()
      $(`.color${[i]}`).css('background-color', color);
      $(`.color${[i]}-text`).text(color);
    }
  }
}

function toggleLock(event) {
  event.stopPropagation();
  $(this).toggleClass('.locked');
  $(this).closest('article').toggleClass('.locked-color');
}

function savePalette(event) {
  event.preventDefault()
  $('.hexCode').each(function() {
    colors.push($(this).text())
  })
  var paletteName = $('.palette-name').val()
  var projectId = $('select option:selected').val();
  var paletteToSave = { palette_name: paletteName, hexCodes: [...colors], project_id: projectId}
  postPalette(paletteToSave)
  colors = []
}

function postPalette(palette) {
  var url = '/api/v1/palettes';
  fetch(url, 
    {method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      palette_name: palette.palette_name, 
      color_1: palette.hexCodes[0], 
      color_2: palette.hexCodes[1],
      color_3: palette.hexCodes[2],
      color_4: palette.hexCodes[3],
      color_5: palette.hexCodes[4],
      project_id: palette.project_id
      })
    })
  .then(response => console.log(response))
  .catch(error => console.log(error.message))
  getProjects()
}


function saveProject(event) {
  event.preventDefault()
  var newProject = $('.project-name').val()
  $('.folder-name').append(`<option>${newProject}</option>`)
  const project = {project_name: newProject}
  postProject(project)
}

function postProject(project) {
  var url = '/api/v1/projects'
  fetch(url, 
    {method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(project)
    })
  .then(response => response.json())
  .then(id => {
     $('.folder-name').append(`<option value='${id}'>${project.project_name}</option>`)
  })

  .catch(error => {
    console.log(error.message)
  })
}

async function getProjects() {
  $('.saved-projects').empty();
  const response = await fetch('/api/v1/projects');
  const projects = await response.json();
  const dropDown = populateDropdown(projects)
  projects.forEach(project => {
    $('.saved-projects').append(`
      <div class="project-container" id="project${project.id}">
      <h3 class="project-title" id="${project.id}">
        ${project.project_name}
      </h3>
      </div>
      `)
    appendPalettes(project.id)
  })
}

async function appendPalettes(projectId) {
  $('project-container').empty()
  const response = await fetch('/api/v1/palettes');
  const palettes = await response.json();
  palettes.forEach(palette => {
    if (palette.project_id === projectId) {
      $(`#${projectId}`).append(`
        <section class='palette-section' id="${palette.id}">
          <section class="mini-palettes">
            <h4 class="palette-name">${palette.palette_name}</h4>
            <button class="delete" id="${palette.id}">X</button>
          </section>
          <div class="tiny-colors">
            <article class="mini-color" style="background-color: ${palette.color_1}">${palette.color_1}</article>
            <article class="mini-color" style="background-color: ${palette.color_2}">${palette.color_2}</article>
            <article class="mini-color" style="background-color: ${palette.color_3}">${palette.color_3}</article>
            <article class="mini-color" style="background-color: ${palette.color_4}">${palette.color_4}</article>
            <article class="mini-color" style="background-color: ${palette.color_5}">${palette.color_5}</article>
          </div>
        </section>`)
    }
  })
}

function populateDropdown(data) {
  data.forEach(entry => {
    $('.folder-name').append(`<option value=${entry.id}>${entry.project_name}</option>`)
  })
}

async function deletePalette(event) {
  $(this).parents('.palette-section').remove()
  const id = event.target.id
  const responseBody = 
  {method: 'DELETE',
  headers: {'Content-Type': 'application/json'}
  }

  const response = await fetch(`/api/v1/palettes/${id}`, responseBody)
  const result = await response.json();
}

async function makeItBig(event) {
  const id = $(event.target).parent().parent().attr('id')
  const response = await fetch(`/api/v1/palettes/${id}`)
  const miniPalette = await response.json()
  const paletteObj = miniPalette[0]
  const keys = Object.keys(paletteObj).filter(key => {
    return key.split('_')[0] === 'color'
  })
  const hexCodes = keys.map(code => paletteObj[code])
  for (var i = 1; i < 6; i++) {
    $(`.color${[i]}`).css('background-color', hexCodes[i]);
    $(`.color${[i]}-text`).text(hexCodes[i]);
  }
}



