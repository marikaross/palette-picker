$('.palette').on('click', makePalette);
$('.lock').on('click', toggleLock);
$('.save').on('click', savePalette);
$('.save-project').on('submit', saveProject);
$('.save-palette').on('submit', savePalette);

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
  // console.log('hi')
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
  console.log(paletteName)
  var projectId = $('select option:selected').val();
  var paletteToSave = { palette_name: paletteName, hexCodes: [...colors], project_id: projectId}
  postPalette(paletteToSave)
  colors = []
}

function postPalette(palette) {
  console.log(palette)
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
  .then(response => response.json())
  .catch(error => console.log(error.message))
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

// function getProjects() {
//   return fetch('/api/v1/projects')
//     .then(response => response.json())
//     .then(result => {
//       populateDropdown(result)
//       getPalettes(result)
//       .then(bananas => console.log
//         (bananas))
//       // console.log(palettes)
//       // return palettes
//     })
//     .catch(error => console.log(error))
// }

async function getProjects() {
  $('.saved-projects').empty();
  const response = await fetch('http://localhost:3000/api/v1/projects');
  const projects = await response.json();
  const dropDown = populateDropdown(projects)
  projects.forEach(project => {
    $('.saved-projects').append(`
      <div class="project-container" id="project${project.id}">
      <h3 class="project-title">
        ${project.project_name}
      </h3>
      <button class="delete-project" id="${project.id}">trash</button>
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
        <section>
          <h4>${palette.palette_name}</h4>
          <section>
            <article style="background-color: ${palette.color_1}">${palette.color_1}</article>
            <article style="background-color: ${palette.color_2}">${palette.color_2}</article>
            <article style="background-color: ${palette.color_3}">${palette.color_3}</article>
            <article style="background-color: ${palette.color_4}">${palette.color_4}</article>
            <article style="background-color: ${palette.color_5}">${palette.color_5}</article>
          </section>
        </section>`)
    }
  })
}

function populateDropdown(data) {
  data.forEach(entry => {
    $('.folder-name').append(`<option value=${entry.id}>${entry.project_name}</option>`)
  })
}



// function showProjectsAndPalettes(results) {
//   results.forEach(result => {
//     return $('.projects').append(`
//       <h2>${result.name}</h2>
//       <h3>palette name</h3>
//       <section class='tiny-palette'>
//         <article>color[0]</article>
//         <article>color[1]</article>
//         <article>color[2]</article>
//         <article>color[3]</article>
//         <article>color[4]</article>
//       </section>
//       `)
//   })
// }

// function getPalettes(results) {
//   var projectIds = results.map(result => {
//     return fetchPalettes(result.id)
//   })

//   var resolvedPromises = Promise.all(projectIds)
//   // console.log(resolvedPromises)
//   return resolvedPromises
// }

// function fetchPalettes(id) {
//   // console.log(id)
//   return fetch(`/api/v1/palettes/${id}`)
//     .then(response => response.json())
//     .then(result => console.log(result)) 
   
// }



