$('.palette').on('click', makePalette)
$('.lock').on('click', toggleLock)


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
    var color = getAColor()
    $(`.color${[i]}`).css('background-color', color)
    $(`.color${[i]}-text`).text(color)
  }
}

function toggleLock() {
  $('.lock').toggleClass('.locked')
}
