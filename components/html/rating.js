/**
    *this is only for checking whether rating is Fractional or not taking Number.
    *If rating is fractional then gradient is used 
    *
    * @param {number} rating value out of number of stars
    * @returns {Boolean} true or false for rating fractional or not
**/
function _isFractionalRating(rating) {
    return (Math.abs(rating - Math.floor(rating)) > 0);
}
/**
    *this is only for checking whether name is method or not, used for calling APIs attached to update and draw
    *
    * @param {String} name name of a method 
    * @returns {Boolean} true or false for type of methodname is function or not
**/
function _isMethod(nameofMethod) {
    return (typeof nameofMethod === 'function');
}
/** 
    *this function checks all the values of valid digits , percentage and pixel values 
    *and then breaks its into number and unit part so that on using values are clear,later  used in setting value in _ValidateSet 
    *
    * @param {String} size from value passed in attributes
    * @param {String} str keeps name of attribute checked i.e 100% ofHeight 
    * @returns {Object} returns an object having value and unit
**/
function _checkSize(size, str) {
    str = str ? 'of ' + str : '';
    // let value = (size + '').match(/\d+/g),
    //     unit = (size + '').match(/px/g) || [''];
    // if (!value) {
    //     if (size) {
    //         console.error("improper size");
    //     }
    //     return {
    //         value: null,
    //         unit: ''
    //     };
    // }
    let value= +(size+"").replace(/px/g,"");

    if (!value) {
        if (size) {
            console.error("improper size "+str);
        }
        return {
            value: null,
            unit: ''
        };
    }
    return {
        value: value,
        unit:''
    };
}
/**
  *this function validates color values of any fill stroke rated or unrated are permissible or not
  *
  * @param   {String} color 
  * @returns {Boolean} true if color is valid hex or rgb
  *          
*/
function _validateColor(color) {
    if (!color) {
        return false;
    }
    if (typeof color === 'number') {
        console.error("Incorrect color specified");
        return false;
    }
    if (color.startsWith('#')) {
        if (!color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g)) {
            console.error("Incorrect hex color code");
            return false;
        }
    } else if (color.startsWith('rgb(')) {
        if (!color.replace(/\s/g, '').match(/^rgb\((\d+),(\d+),(\d+)\)$/g)) {
            console.error("Incorrect rgb color code");
            return false;
        }
    }
    return true;
}

/*the class which creates the chart and creates svg*/
export default class Rating {
    constructor(container, args) {
        //check if container is a HTMLElement otherwise show and error because container is neccesity to create svg
        if (!(container instanceof HTMLElement)) {
            console.error("A HTML Element must be provided in the first argument");
            return null;
        }
        this._config={};
        this._helperConfig={};
        this.ele={};
        this.ele.container = container;
        //setting default values
        this._config.height = 400;
        this._config.width = 400;
        this._config.NofStars = 5;
        this._config.rating = undefined;
        this._config.orientation = 'left-to-right';
        this._config.padding = 1;
        this._config.justifyContent = 'center';
        this._config.alignItems = 'center';
        this._config.strokeWidth = 0;
        this._config.ratedFill = "#0000ff";
        this._config.nonratedFill = "#00ffff";
        this._config.ratedStroke = "none";
        this._config.nonratedStroke = "none";
        this._helperConfig.direction = 'row';//for left-to-right and right-to-left orientation :row and for top-to-bottom or bottom-to-top:column
        this._helperConfig.flow = '';//if '' then left to right or top-to-bootm otherwise 'reverse' means bottom-to-top ot right-to-left "For internal use in this class only"
        this._helperConfig.hasAnimationFrame=false;
        this._helperConfig.initialSide=this._config.height/this._config.NofStars;
        this._helperConfig.side;

        this.ele.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.ele.container.appendChild(this.ele.svg);
        this.ele.stars = [];
        //for creating defs and defs.appendChild(linearGradient);
        this.ele.defs = document.createElementNS("http://www.w3.org/2000/svg", "defs"),
        this.ele.linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"),
        this.ele.strokeLinearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"),
        this.ele.Rated = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
        this.ele.NonRated = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
        this.ele.ratedStroke= document.createElementNS("http://www.w3.org/2000/svg", "stop"),
        this.ele.nonratedStroke = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this.ele.linearGradient.setAttribute("id", "filling");
        this.ele.linearGradient.setAttribute("x1", "0%");
        this.ele.linearGradient.setAttribute("y1", "0%");
        this.ele.strokeLinearGradient.setAttribute("id", "partial-stroke");
        this.ele.strokeLinearGradient.setAttribute("x1", "0%");
        this.ele.strokeLinearGradient.setAttribute("y1", "0%");
        this.ele.linearGradient.appendChild(this.ele.Rated);
        this.ele.linearGradient.appendChild(this.ele.NonRated);
        this.ele.strokeLinearGradient.appendChild(this.ele.ratedStroke);
        this.ele.strokeLinearGradient.appendChild(this.ele.nonratedStroke);
        this.ele.defs.appendChild(this.ele.linearGradient);
        this.ele.defs.appendChild(this.ele.strokeLinearGradient);
        this.ele.svg.appendChild(this.ele.defs);

        if (args) {
            if (this._ValidateSet(args)&&!(this._helperConfig.hasAnimationFrame)) {
                this._helperConfig.hasAnimationFrame=true;
                window.requestAnimationFrame(()=>this._draw(args));
            } 
            else {
                console.error("cannot draw chart");
                return null;
            }
        }
        else {
            if(!(this._helperConfig.hasAnimationFrame)){
                this._ValidateSet({});
                this._helperConfig.hasAnimationFrame=true;
                window.requestAnimationFrame(()=>this._draw(args));
            }
        }
    }
    //internal function for validating and setting values of attributes of svg and path
    _ValidateSet(args) {
        let height = _checkSize(args['height'], 'Height'),
            width = _checkSize(args['width'], 'Width'),
            NofStars = args['stars'],
            rating = args['rating'],
            orientation = args['orientation'],
            padding = _checkSize(args['padding'], 'Padding'),
            strokeWidth = _checkSize(args['stroke-width'], 'Stroke Width'),
            justifyContent = args['justify-content'],
            alignItems = args['align-items'],
            styles = {
                "rated": args['rated'],
                "nonrated": args['nonrated']
            };
        var permissibleOrientation = ['left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top'],
            permissibleJustifyContent = ['center', 'space-evenly', 'start', 'end'],
            permissibleAlignItems = ['center', 'start', 'end'],
            continueCreate = true,
            side, initialSide,
            direction,
            flow;

        //check height and width  --validation for svg
        width = width.value ? width.value + width.unit : this._config.width;
        height = height.value ? height.value + height.unit : this._config.height;
        this.ele.svg.setAttribute("width", width);//for async removed from validate and set
        this.ele.svg.setAttribute("height", height);//for async removed from validate and set
        //get the height width from svg
        // height = this.ele.svg.clientHeight;
        // width = this.ele.svg.clientWidth;
        if (width < 20) {
            console.error("Minimum width value is 20");
            width = this._config.width;
            this.ele.svg.setAttribute("width", width);
        }
        if (height < 20) {
            console.error("Minimum width value is 20");
            height = this._config.height;
            this.ele.svg.setAttribute("height", height);
        } 
        if (!+NofStars) {
            NofStars = this._config.NofStars;
        }
        if (NofStars <= 0) {
            console.error("No of stars must be greater than 0");
            continueCreate = false;
        }
        //check if rating is given as number otherwise set the default value 5
        if (!+rating && rating!= 0) {
            rating = this._config.rating;
        }
        if (rating && (rating > NofStars || rating < 0)) {
            console.error("Rating should be greater than 0 and less than No of stars");
            continueCreate = false;
        }
        //justify content permissible or not
        if (!permissibleJustifyContent.includes(justifyContent)) {
            if (justifyContent) {
                console.error("Incorrect value for justify-content");
            }
            justifyContent = this._config.justifyContent;
        }
        //Align items values check
        if (!permissibleAlignItems.includes(alignItems)) {
            if (alignItems) {
                console.error("Incorrect value for align-items");
            }
            alignItems = this._config.alignItems;
        }
        //orientation permissible  or not
        if (!permissibleOrientation.includes(orientation)) {
            if (orientation) {
                console.error("Incorrect value for orientation");
            }
            orientation = this._config.orientation;
        }
        direction = (orientation == 'left-to-right' || orientation == 'right-to-left') ? 'row' : 'column';
        flow = (orientation == 'right-to-left' || orientation == 'bottom-to-top') ? 'reverse' : '';

        //adding valid padding
        if (padding.unit == 'px' || padding.unit == '') {
            if (!padding.value) {
                if (args['padding']) {
                    console.error("Incorrect padding value");
                }
                padding = this._config.padding;
            } 
            else {
                padding = padding.value;
            }
        } 
        else {
            console.error("Paddding value allowed only as number or pixels");
        }
        if(padding < 1){
            console.error("Incorrect padding.");
            padding = this._config.padding;
        }

        //adding stroke-width
        if (strokeWidth.unit == 'px' || strokeWidth.unit == '') {
            if (!strokeWidth.value) {
                if (args['stroke-width']) {
                    if(!(args['rated']['stroke'])||!(args['nonrated']['stroke']))
                    console.error("Incorrect stroke width value");
                }
                strokeWidth = this._config.strokeWidth;
            } 
            else {
                strokeWidth = strokeWidth.value;
            }
        } 
        else {
            console.error("Stroke width value allowed only as number or pixels");
        }

        //validating and adding styles for rated or nonrated stars
        if (!styles['rated']) {
            styles['rated'] = {};
        }
        if (!styles['nonrated']) {
            styles['nonrated'] = {};
        }
        styles['rated']['fill'] = _validateColor(styles['rated']['fill']) ? styles['rated']['fill'] : this._config.ratedFill;
        styles['rated']['stroke'] = _validateColor(styles['rated']['stroke']) ? styles['rated']['stroke'] : this._config.ratedStroke;

        styles['nonrated']['fill'] = _validateColor(styles['nonrated']['fill']) ? styles['nonrated']['fill'] : this._config.nonratedFill;
        styles['nonrated']['stroke'] = _validateColor(styles['nonrated']['stroke']) ? styles['nonrated']['stroke'] : this._config.nonratedStroke;
        //Do calculation to check on star creation related padding and stroke-width depending upon side 
        if (continueCreate) {
            
            initialSide = Math.min((direction == 'row' ? width / NofStars : width),(direction == 'column' ? height / NofStars : height));
            
            if(strokeWidth < 0 || strokeWidth > 0.10 * initialSide){
                console.error("stroke-width not acceptable");
                strokeWidth = this._config.strokeWidth;
            }
            if(padding < 1 || padding > 0.10 * initialSide){
                console.error("padding not acceptable");
                padding = this._config.padding;
            }
            side = initialSide - (padding * 2) - (strokeWidth * 2);
            
            if (initialSide < 16) {
                console.error("so many stars can't fit here");
                continueCreate = false;
            }
            if (side < 10) {
                if (padding > 2) {
                    console.error("reducing padding.");
                    padding = this._config.padding;
                    side = initialSide - padding * 4 - strokeWidth * 4;
                } else if (strokeWidth > (0.10 * initialSide)) {
                    console.error("Decrease stroke-width.");
                    strokeWidth = this._config.strokeWidth;
                    side = initialSide - (padding * 2) - (strokeWidth * 4);
                }
            }
            //If side is less than 10 set padding and stroke-width to 2 and 0 and increasing side with addded values of padding and stroke
            if (side < 10) {
                if (padding > 2){
                    console.warn("Automatically setting padding to default");
                    padding = 2;
                    side = initialSide - (padding * 4) - (strokeWidth * 4);
                } else if (strokeWidth > (0.10 * initialSide)) {
                    console.error("setting stroke-width to 0");
                    strokeWidth = 0;
                    side = initialSide - (padding * 4) - (strokeWidth * 4);
                }
            }

            //If side is less than 10 then cannot be drawn
            if (side < 10) {
                console.error("drawing error. Try with different values");
                continueCreate = false;
            }
        }
        //check if condition all above condition works fine
        if (continueCreate) {
            this._config.height = height;
            this._config.width = width;
            this._config.orientation = orientation;
            this._config.padding = padding;
            this._config.rating = rating;
            this._config.NofStars = NofStars;
            this._config.ratedFill = styles['rated']['fill'];
            this._config.ratedStroke = styles['rated']['stroke'];
            this._config.nonratedFill = styles['nonrated']['fill'];
            this._config.nonratedStroke = styles['nonrated']['stroke'];
            this._helperConfig.side = side;
            this._helperConfig.initialSide = initialSide;
            
            this._config.strokeWidth = strokeWidth;
            this._config.justifyContent = justifyContent;
            this._config.alignItems = alignItems;
            this._helperConfig.direction = direction;
            this._helperConfig.flow = flow;
        } 
        //else set to default height width
        else {
            this.ele.svg.setAttribute("width", this._config.width);
            this.ele.svg.setAttribute("height", this._config.height);
        }
        return continueCreate;
    }
    _getPath(side) {
        let str ="",
            ax = 0.15,
            bx = (1 - 2 * ax) / 2,
            cx=0.3,
            dx = 0.5,
            ex = 0.3,
            ay = 0.3, by = 0.3,
            cy = (1 - ay - by),
            dy = 0.25,
            am = ax / ay;
        cx = (am * cy);
        ex = ex * am;
        str += "l" + (ax * side) + "," + (ay * side) 
        + " h" + (bx * side)
         +" l-" + (cx * side) + "," + (by * side)
        + " l" + (cx * side) + "," + (cy * side)
        + " l-" + (dx * side) + ",-" + (dy * side)
         + " l-" + (dx * side) + "," + (dy * side)
         + " l" + (cx * side) + ",-" + (cy * side)
         + " l-" + (cx * side) + ",-" + (by * side)
         +" h" + (bx * side)
         + " z";
        
        return str;
    }
    _createGradient() {
        
        let ratingFraction = 0, startFill = this._config.ratedFill, endFill = this._config.nonratedFill, startStroke = this._config.ratedStroke, endStroke = this._config.nonratedStroke;
        // if (this._helperConfig.direction == 'row') 
        // {
        //     this.ele.linearGradient.setAttribute("x2", "100%");
        // }
        if (this._helperConfig.direction == 'column') 
        {
            this.ele.linearGradient.setAttribute("x2", "0%");
        }
        if (this._helperConfig.direction == 'column'){
            this.ele.linearGradient.setAttribute("y2", "100%");
        }
        // else if (this._helperConfig.direction == 'row'){
        //     this.ele.linearGradient.setAttribute("y2", "0%");
        // }
        
        // if (this._helperConfig.direction == 'row') {
        //     this.ele.strokeLinearGradient.setAttribute("x2", "100%");
        // } 
        if (this._helperConfig.direction == 'column') {
            this.ele.strokeLinearGradient.setAttribute("x2", "0%");
        }
        if (this._helperConfig.direction == 'column') {
            this.ele.strokeLinearGradient.setAttribute("y2", "100%");
        } 
        // else if (this._helperConfig.direction == 'row') {
        //     this.ele.strokeLinearGradient.setAttribute("y2", "0%");
        // }
        ratingFraction = this._config.rating ? (this._config.rating - Math.floor(this._config.rating)).toFixed(2) : 0;
        if (this._helperConfig.flow == 'reverse') {
            ratingFraction = 1 - ratingFraction;
            startFill = this._config.nonratedFill;
            endFill = this._config.ratedFill;
            startStroke = this._config.nonratedStroke;
            endStroke = this._config.ratedStroke;
        }
        
        this.ele.Rated.setAttribute("offset", (ratingFraction * 100) + "%");
        this.ele.NonRated.setAttribute("offset", (ratingFraction * 100) + "%");
        this.ele.Rated.setAttribute("style", "stop-color:" + startFill);
        this.ele.NonRated.setAttribute("style", "stop-color:" + endFill);
        this.ele.ratedStroke.setAttribute("offset", (ratingFraction * 100) + "%");
        this.ele.nonratedStroke.setAttribute("offset", (ratingFraction * 100) + "%");
        this.ele.ratedStroke.setAttribute("style", "stop-color:" + startStroke);
        this.ele.nonratedStroke.setAttribute("style", "stop-color:" + endStroke);
        
    }
    _draw(){
        this._helperConfig.hasAnimationFrame=false;
        var i, j, startY = 0, startX = 0, shiftX = 0, shiftY = 0, 
        rating = !this._config.rating && this._config.rating != 0 ? this._config.NofStars : this._config.rating; //Nofstars 0 check
        //Append if extra needed
        for (i = this.ele.stars.length; i < this._config.NofStars; i++) 
        {
            let elem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this.ele.svg.appendChild(elem);
            this.ele.stars.push(elem);
        }
        
        if (_isFractionalRating(rating)) {
                this._createGradient();
        }
        if (this._helperConfig.direction == 'row'){
            shiftX = this._helperConfig.initialSide;
            if (this._config.justifyContent == 'start'){
                startX = (this._helperConfig.initialSide / 2);
            }
            else if (this._config.justifyContent == 'center') {
                startX = (this._helperConfig.initialSide / 2) + ((this._config.width - (this._helperConfig.initialSide * this._config.NofStars)) / 2);
            }
            else if (this._config.justifyContent == 'end') {
                startX = (this._config.width - (this._helperConfig.initialSide * this._config.NofStars)) - (this._helperConfig.initialSide / 2);
            } else if (this._config.justifyContent == 'space-evenly') {
                shiftX = this._config.width / this._config.NofStars;
                startX = shiftX / 2;
            }
            if(this._config.alignItems == 'center'){
                startY = ((this._helperConfig.initialSide - this._helperConfig.side) / 2) + ((this._config.height - this._helperConfig.initialSide) / 2);
            }else if(this._config.alignItems == 'start'){
                startY = ((this._helperConfig.initialSide - this._helperConfig.side) / 2);
            }else if(this._config.alignItems == 'end'){
                startY = (this._config.height - this._helperConfig.initialSide); 
            }
        } else if (this._helperConfig.direction == 'column') {
            shiftY = this._helperConfig.initialSide;
            if (this._config.justifyContent == 'start') {
                startY = (this._helperConfig.initialSide - this._helperConfig.side) / 2;
            } else if (this._config.justifyContent == 'center') {
                startY = ((this._helperConfig.initialSide - this._helperConfig.side) / 2);
            } else if (this._config.justifyContent == 'end') {
                startY = (this._config.height - (this._helperConfig.initialSide * this._config.NofStars));
            } else if (this._config.justifyContent == 'space-evenly') {
                shiftY = this._config.height / this._config.NofStars;
                startY = (shiftY - this._helperConfig.side) / 2;
            }
            if(this._config.alignItems == 'center'){
                startX = (this._helperConfig.initialSide / 2) + ((this._config.width - this._helperConfig.initialSide) / 2);
            }else if(this._config.alignItems == 'start'){
                startX = this._helperConfig.initialSide / 2;
            }else if(this._config.alignItems == 'end'){
                startX = this._config.width - (this._helperConfig.initialSide / 2);
            }
        }
        var temp=this._getPath(this._helperConfig.side);
        for (i = 0; i < this.ele.stars.length; i++) {
            this.ele.stars[i].setAttribute('d', "M "+(startX+(shiftX*i))+","+(startY + (shiftY * i))+" "+temp);
        }
        //reverse or not decides filling of star number i.e. star[i]
        for (i = 0; i < this.ele.stars.length; i++) {
            j = this._helperConfig.flow == 'reverse' ? this.ele.stars.length - i - 1 : i;
            if (_isFractionalRating(rating) && Math.ceil(rating) == j + 1) {
                this.ele.stars[i].setAttribute("fill", "url(#filling)");
                this.ele.stars[i].setAttribute("stroke", "url(#partial-stroke)");
            } 
            else {
                this.ele.stars[i].setAttribute("fill", j < Math.ceil(rating) ? this._config.ratedFill : this._config.nonratedFill);
                this.ele.stars[i].setAttribute("stroke", j < Math.ceil(rating) ? this._config.ratedStroke : this._config.nonratedStroke);
            }
            this.ele.stars[i].setAttribute("stroke-width", this._config.strokeWidth + "px");
        }
        //Remove from svg
        for (i = this.ele.stars.length - 1; i >= this._config.NofStars; i--) {
            this.ele.svg.removeChild(this.ele.stars.pop());
        }
        if(_isMethod(this.onDraw))
            this.onDraw();
    }
    /**
     * Drawing stars update in attribut of svg or path
     * 
     *  @param {Object} args attributes to draw stars 
     **/
    update(args) {
        if(_isMethod(this.onUpdate))
            this.onUpdate();
        if (args) {
            if (this._ValidateSet(args)&&(!(this._helperConfig.hasAnimationFrame)) ){
                this._helperConfig.hasAnimationFrame=true;
                window.requestAnimationFrame(()=>this._draw(args));
            } 

        }
        
    }
}
