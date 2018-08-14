$('.palette').on('click', makePalette);
$('.lock').on('click', toggleLock);


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
      console.log(this)
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

