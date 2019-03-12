
function main() {
  const canvas = document.createElement('canvas');
  document.querySelector('body').appendChild(canvas);
  const gl = canvas.getContext('webgl');

  gl.clearColor(0, 1, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

document.addEventListener('DOMContentLoaded', main);

