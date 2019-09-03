var N 
var rating=1
function calculatePositions(pWidth, pHeight, strokeWidth, unit, xShift = 0, yShift = 0, direction = 'row',N=1){
    if(unit == '%'){
        //strokeWidth = Math.min(pWidth, pHeight) * (strokeWidth / 25);
        throw new TypeError('Must provide stroke width in pixels');
    }
    let h = direction == 'row' ? pWidth / N : pWidth;
    let w = direction == 'column' ? pHeight / N : pHeight; 
    let side = Math.min(h, w) - Math.max(strokeWidth * 4, 4),
    str = "M" + (xShift + (pWidth / 2)) + "," + (yShift + (pHeight - side) / 2),
    ax = 0.15, 
    bx = (1 - 2 * ax)/2, 
    cx = 0.3,
    dx = 0.5, 
    ex = 0.3,
    ay = 0.3, by = 0.3, 
    cy = (1 - ay - by), 
    dy = 0.25,
    am = ax / ay;
    cx = (am * cy);
    ex = ex * am;
    str += " l" + (ax * side) + "," + (ay * side);
    str += " h" + (bx * side);
    str += " l-" + (cx * side) + "," + (by * side);
    str += " l" + (cx * side) + "," + (cy * side);
    str += " l-" + (dx * side) + ",-" + (dy * side);
    str += " l-" + (dx * side) + "," + (dy * side);
    str += " l" + (cx * side) + ",-" + (cy * side);
    str += " l-" + (cx * side) + ",-" + (by * side);
    str += " h" + (bx * side);
    str += " z"; 
    return str;
}

function adjustSize(size){
    let num = (size+'').match(/\d+/g),
    unit = (size+'').match(/px|%|vh|vw/g) || [''];
    if(!num){
        throw new TypeError("error in size value");
    }
    return{
        num: +num[0],
        unit: unit[0]
    };
}


export default function cStar(pElement, width=200, height=200, direction, styles,N=1,rating=1){
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    stars = [],
    styleStrR = 'fill:"#000" ; stroke:"#fff";',
    styleStrU = 'fill:"#ddd" ; stroke:"#fff";',
    xShift = 0, yShift = 0,
    strokeWidth = styles["stroke-width"] ? adjustSize(styles["stroke-width"]) : 2;

    if(!strokeWidth.num){
        strokeWidth = {
            "num": 2,
            "unit": ''
        }
    }

    console.log(strokeWidth.num);

    if(!(pElement instanceof HTMLElement)){
        throw new TypeError("First argument must be a html element");
    }

    for(let i = 0; i < N; i++){
        stars.push(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    }
    if(height<=1||!+height)
      console.error("Incorrect Height");
    if(width<=1||!+width)
      console.error("Incorrect width");
      
    svg.setAttribute("height", height);
    svg.setAttribute("width", width);
    pElement.appendChild(svg);

    // for(let i in customAttributes){
    //     if(styles.hasOwnProperty(customAttributes[i].styleName)){
    //         if(!styles[customAttributes[i].styleName].match(customAttributes[i].regex)){
    //             throw new TypeError(customAttributes[i].err);
    //         }
    //     }
    // }

    if(strokeWidth.num > Math.min(svg.clientWidth, svg.clientHeight) / (2*N)){
        console.log(strokeWidth.num, svg.clientWidth, svg.clientHeight);
        throw new TypeError("Incorrect value of stroke width");
    }

    if(direction == 'row'){
        if(styles["content"] == "stretch"){
            xShift = svg.clientWidth / N;
        }else{
            xShift = Math.min(svg.clientWidth / N, svg.clientHeight);
        }
    }else if(direction == 'column'){
        if(styles["content"] == "stretch"){
            yShift = svg.clientHeight / N;
        }else{ 
            // if(styles["content"] == "center")
            yShift = Math.min(svg.clientHeight / N, svg.clientWidth);
        }
    }else{
        throw new TypeError('Incorrect direction');
    }

    for(let i = 0; i < stars.length; i++){
      
        stars[i].setAttribute("d", calculatePositions(svg.clientWidth, svg.clientHeight, strokeWidth.num, strokeWidth.unit, xShift * ((Math.floor(N/2)) - i), yShift * ((Math.floor(N/2)) - i), direction,N))
    }

    // for(let i in allowedStyles){
    //     if(styles.hasOwnProperty(allowedStyles[i].styleName)){
    //         if(styles[allowedStyles[i].styleName].match(allowedStyles[i].regex)){
    //             styleStr += allowedStyles[i].styleName + ':' + styles[allowedStyles[i].styleName] + ';';
    //         }else{
    //             throw new TypeError(allowedStyles[i].err);
    //         }
    //     }
    // }
    for(let a in styles){
      if(a=="rated")
      {
        for(let p in styles[a])
        styleStrR += p + ':' + styles[a][p] + ';';
      }
      if(a=="unrated")
      {
        for(let p in styles[a])
        styleStrU += p + ':' +  styles[a][p] + ';';
      }

    }
    for(let i = 0; i < stars.length; i++){
      if(i<Math.ceil(rating))
        stars[i].setAttribute("style", styleStrR);
      else
        stars[i].setAttribute("style", styleStrU);
      svg.appendChild(stars[i]);
    }
    pElement.appendChild(svg);
}
