
function positions(pWidth, pHeight,i,j){
  let side = Math.min(pWidth, pHeight),
  str = "m" + ((pWidth/ 2)+(i*side)) + "," + ((pHeight - side)/2+(j*side)),
  ax = 0.15, 
  bx = (1 - 2 * ax)/2, 
  cx = 0.5, 
  ay = 0.3, by = 0.25, 
  cy = (1 - ay - by), 
  dy = 0.3;
  str += " l" + (ax * side) + "," + (ay * side)
  + " h" + (bx * side)
  + " l-" + (2*ax * side) + "," + (by * side)
  + " l" + (2*ax * side) + "," + (cy * side)
  + " l-" + (cx * side) + ",-" + (dy * side)
  + " l-" + (cx * side) + "," + (dy * side)
  + " l" + (2*ax * side) + ",-" + (cy * side)
  + " l-" + (2*ax * side) + ",-" + (by * side)
  + " h" + (bx * side)
  + " z"; 
  return str;
}

export default function star(pElement, width, height, styles,direction){
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", height);
  svg.setAttribute("width", width);
  
  var b=function (){
    for(var i=0;i<5;i++)
    {
      var j=0;
      let path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      var str1 = '';
      if(direction=="column")
      {
        path.setAttribute("d", positions((width/5), height,i,j));
      }
      else if(direction=="row"){
        path.setAttribute("d",positions(width,(height/5),j,i))
      }
      for(let a in styles){
          str1 += a + ':' + styles[a] + ';';
      }
      path.setAttribute("style",str1);
      svg.appendChild(path);

    };

  pElement.appendChild(svg);
  }();
}

