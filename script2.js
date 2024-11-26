import { neonCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'
const width = window.screen.width;
console.log(width);

neonCursor({
  el: document.getElementById('home'),
  shaderPoints: 16,
  curvePoints: 200,
  curveLerp: 0.7,
  radius1: 4,
  radius2: 20,
  velocityTreshold: 10,
  sleepRadiusX: (width < 320 ? 30 : width < 350 ? 35 : width < 400 ? 38 : width < 470 ? 45 : width < 550 ? 50 : width < 768 ? 65 : 100),
  sleepRadiusY: (width < 320 ? 30 : width < 350 ? 35 : width < 400 ? 38 : width < 470 ? 45 : width < 550 ? 50 : width < 768 ? 65 : 100),
  sleepTimeCoefX: 0.0025,
  sleepTimeCoefY: 0.0025,
})


