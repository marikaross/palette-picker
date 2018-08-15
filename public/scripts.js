$('.palette').on('click', makePalette);
$('.lock').on('click', toggleLock);
$('.save').on('click', savePalette);
// $('window').load(getProjects);
// $('window').load(makePalette);
// $('.save-project').on('submit', saveProject);


// function welcome() {
//   getProjects()
//   makePalette()
// }


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

function savePalette() {

}

// function saveProject(event) {
//   var newProject = 
// }

// function getProjects() {
//   fetch('http://localhost:3000/api/v1/projects')
//     .then(response => response.json())
//     .then(result => showProjects(results))
//     .catch(error => throw error)

// }

// function showProjects(results) {
//   results.map(result => {
//     return 
//   $('.projects').append(`
//     <h2>${result.name}</h2>
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

function getPalette() {

}


