
function moveBackwards(delta){
  const newPoints = []
  for(let p of ps){
    // TODO make movement relative to render speed
    // const perSecond = delta / 1000
    p.x -= speed
    const displayY = Math.round(svgHeight - p.y / scope)
    // console.log("TCL: moveBackwards -> displayY", p.y, displayY)
    newPoints.push(`${Math.round(p.x)},${displayY}`)
  }
  
  polyline.setAttribute('points', newPoints.join(' '));
  
}
let ps = [{x:0,y:0}]

function add(y){
  if(ps.length > MAX_POINTS){
  // remove first element
    ps = ps.slice(1)
  }
    // X is static so the graph always puts the new point at the same place on the x axis
    const x = 150
  // add a new element
  ps.push({x,y})
}
const MAX_POINTS = 100 
const speed = 0.3
let lastTime;
const svgHeight = 100
let scope = 1
function loop(timestamp) {
  const delta = timestamp - lastTime
  moveBackwards(delta)
  lastTime = timestamp
  requestAnimationFrame(loop)
  
}
let polyline;
export function startGraph() {
    polyline = document.getElementById('poly')
    // "Move" the graph backwards
    loop()
}
export function addY(y){
    // graph is 200 by 100.  bottom is 100
    scope = Math.ceil(y / svgHeight)
    console.log("TCL: addY -> scope", scope)
    add(y)
}