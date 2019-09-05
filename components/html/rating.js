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
    *this function checks all the values of valid digits , percentage and pixel values 
    *and then breaks its into number and unit part so that on using values are clear,later  used in setting value in _validateAndSet 
    *
    * @param {String} size from value passed in attributes
    * @param {String} str keeps name of attribute checked i.e 100% ofHeight 
    * @returns {Object} returns an object having value and unit
**/
function _checkSize(size, str) {
    str = str ? 'of ' + str : '';
    let value = (size + '').match(/\d+/g),
        unit = (size + '').match(/px|%/g) || [''];
    if (!value) {
        if (size) {
            console.error("improper size");
        }
        return {
            value: null,
            unit: ''
        };
    }
    return {
        value: +value[0],
        unit: unit[0]
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
class Rating {
    constructor(container, attribs) {
        //check if container is a HTMLElement otherwise show and error because container is neccesity to create svg
        if (!(container instanceof HTMLElement)) {
            console.error("A HTML Element must be provided in the first argument");
            return null;
        }
        this.container = container;
        //setting default values
        this.height = 400;
        this.width = 400;
        this.NofStars = 5;
        this.rating = undefined;
        this.orientation = 'left-to-right';
        this.padding = 1;
        this.justifyContent = 'center';
        this.alignItems = 'center';
        this.strokeWidth = 0;
        this.ratedFill = "#ff0";
        this.nonratedFill = "#ddd";
        this.ratedStroke = "none";
        this.nonratedStroke = "none";
        this.direction = 'row';//for left-to-right and right-to-left orientation :row and for top-to-bottom or bottom-to-top:column
        this.flow = '';//if '' then left to right or top-to-bootm otherwise 'reverse' means bottom-to-top ot right-to-left "For internal use in this class only"
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.container.appendChild(this.svg);
        this.stars = [];
        if (attribs) {
            if (this._validateAndSet(attribs)) {
                this._createStar();
            } 
            else {
                this.container.removeChild(this.svg);
                console.error("Stopping execution");
                return null;
            }
        }
        else {
            this._validateAndSet({});
            this._createStar();
        }
    }
    //internal function for validating and setting values of attributes of svg and path
    _validateAndSet(attribs) {
        let height = _checkSize(attribs['height'], 'Height'),
            width = _checkSize(attribs['width'], 'Width'),
            NofStars = attribs['stars'],
            rating = attribs['rating'],
            orientation = attribs['orientation'],
            padding = _checkSize(attribs['padding'], 'Padding'),
            strokeWidth = _checkSize(attribs['stroke-width'], 'Stroke Width'),
            justifyContent = attribs['justify-content'],
            alignItems = attribs['align-items'],
            styles = {
                "rated": attribs['rated'],
                "nonrated": attribs['nonrated']
            };
        var permissibleOrientation = ['left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top'],
            permissibleJustifyContent = ['center', 'space-evenly', 'start', 'end'],
            permissibleAlignItems = ['center', 'start', 'end'],
            continueCreate = true,
            side, initialSide,
            direction,
            flow;

        //check height and width  --validation for svg
        width = width.value ? width.value + width.unit : this.width;
        height = height.value ? height.value + height.unit : this.height;
        this.svg.setAttribute("width", width);
        this.svg.setAttribute("height", height);
        //get the height width from svg
        height = this.svg.clientHeight;
        width = this.svg.clientWidth;
        if (width < 20) {
            console.error("Minimum width value is 20");
            width = this.width;
            this.svg.setAttribute("width", width);
        }
        if (height < 20) {
            console.error("Minimum width value is 20");
            height = this.height;
            this.svg.setAttribute("height", height);
        } 
        if (!+NofStars) {
            NofStars = this.NofStars;
        }
        if (NofStars <= 0) {
            console.error("No of stars must be greater than 0");
            continueCreate = false;
        }
        //check if rating is given as number otherwise set the default value 5
        if (!+rating && rating != 0) {
            rating = this.rating;
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
            justifyContent = this.justifyContent;
        }
        //Align items values check
        if (!permissibleAlignItems.includes(alignItems)) {
            if (alignItems) {
                console.error("Incorrect value for align-items");
            }
            alignItems = this.alignItems;
        }
        //orientation permissible  or not
        if (!permissibleOrientation.includes(orientation)) {
            if (orientation) {
                console.error("Incorrect value for orientation");
            }
            orientation = this.orientation;
        }
        direction = (orientation == 'left-to-right' || orientation == 'right-to-left') ? 'row' : 'column';
        flow = (orientation == 'right-to-left' || orientation == 'bottom-to-top') ? 'reverse' : '';

        //adding valid padding
        if (padding.unit == 'px' || padding.unit == '') {
            if (!padding.value) {
                if (attribs['padding']) {
                    console.error("Incorrect padding value");
                }
                padding = this.padding;
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
            padding = this.padding;
        }

        //adding stroke-width
        if (strokeWidth.unit == 'px' || strokeWidth.unit == '') {
            if (!strokeWidth.value) {
                if (attribs['stroke-width']) {
                    if(!(attribs['rated']['stroke'])||!(attribs['nonrated']['stroke']))
                    console.error("Incorrect stroke width value");
                    
                }
                strokeWidth = this.strokeWidth;
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

        styles['rated']['fill'] = _validateColor(styles['rated']['fill']) ? styles['rated']['fill'] : this.ratedFill;
        styles['rated']['stroke'] = _validateColor(styles['rated']['stroke']) ? styles['rated']['stroke'] : this.ratedStroke;

        styles['nonrated']['fill'] = _validateColor(styles['nonrated']['fill']) ? styles['nonrated']['fill'] : this.nonratedFill;
        styles['nonrated']['stroke'] = _validateColor(styles['nonrated']['stroke']) ? styles['nonrated']['stroke'] : this.nonratedStroke;
        //Do calculation to check on star creation related padding and stroke-width depending upon side 
        if (continueCreate) {
            initialSide = Math.min(direction == 'row' ? width / NofStars : width, direction == 'column' ? height / NofStars : height);
            if(strokeWidth < 0 || strokeWidth > 0.10 * initialSide){
                console.error("stroke-width not acceptable");
                strokeWidth = this.strokeWidth;
            }
            if(padding < 1 || padding > 0.10 * initialSide){
                console.error("padding not acceptable");
                padding = this.padding;
            }
            side = initialSide - (padding * 2) - (strokeWidth * 2);
            
            if (initialSide < 16) {
                console.error("so many stars can't fit here");
                continueCreate = false;
            }
            if (side < 10) {
                if (padding > 2) {
                    console.error("Decrease padding.");
                    padding = this.padding;
                    side = initialSide - padding * 4 - strokeWidth * 4;
                } else if (strokeWidth > (0.10 * initialSide)) {
                    console.error("Decrease stroke-width.");
                    strokeWidth = this.strokeWidth;
                    side = initialSide - (padding * 2) - (strokeWidth * 4);
                }
            }

            //If side is less than 10 set padding and stroke-width to 2 and 0 and increasing side with addded values of padding and stroke
            if (side < 10) {
                if (padding > 2) {
                    console.warn("Automatically setting padding to default");
                    padding = 2;
                    side = initialSide - (padding * 4) - (strokeWidth * 4);
                } else if (strokeWidth > (0.10 * initialSide)) {
                    console.error("Automatically setting stroke-width to 0");
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
            this.height = height;
            this.width = width;
            this.orientation = orientation;
            this.padding = padding;
            this.rating = rating;
            this.NofStars = NofStars;
            this.ratedFill = styles['rated']['fill'];
            this.ratedStroke = styles['rated']['stroke'];
            this.nonratedFill = styles['nonrated']['fill'];
            this.nonratedStroke = styles['nonrated']['stroke'];
            this.side = side;
            this.initialSide = initialSide;
            this.strokeWidth = strokeWidth;
            this.justifyContent = justifyContent;
            this.alignItems = alignItems;
            this.direction = direction;
            this.flow = flow;
        } 
        //else set to default height width
        else {
            this.svg.setAttribute("width", this.width);
            this.svg.setAttribute("height", this.height);
        }
        return continueCreate;
    }

    _getPath(side, X, Y) {
        let str = "M" + X + "," + Y,
            ax = 0.15,
            bx = (1 - 2 * ax) / 2,
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

    _createGradient() {
        let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs"),
            linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"),
            strokeLinearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"),
            RatedStart = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
            RatedEnd = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
            NonRatedStart = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
            NonRatedEnd = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
            ratedStrokeStart = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
            ratedStrokeEnd = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
            nonratedStrokeStart = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
            nonratedStrokeEnd = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
            ratingFraction = 0, startFill = this.ratedFill, endFill = this.nonratedFill, startStroke = this.ratedStroke, endStroke = this.nonratedStroke;

        linearGradient.setAttribute("id", "partial-fill");
        linearGradient.setAttribute("x1", "0%");
        if (this.direction == 'row') {
            linearGradient.setAttribute("x2", "100%");
        } else if (this.direction == 'column') {
            linearGradient.setAttribute("x2", "0%");
        }
        linearGradient.setAttribute("y1", "0%");
        if (this.direction == 'column') {
            linearGradient.setAttribute("y2", "100%");
        } else if (this.direction == 'row') {
            linearGradient.setAttribute("y2", "0%");
        }
        strokeLinearGradient.setAttribute("id", "partial-stroke");
        strokeLinearGradient.setAttribute("x1", "0%");
        if (this.direction == 'row') {
            strokeLinearGradient.setAttribute("x2", "100%");
        } else if (this.direction == 'column') {
            strokeLinearGradient.setAttribute("x2", "0%");
        }
        strokeLinearGradient.setAttribute("y1", "0%");
        if (this.direction == 'column') {
            strokeLinearGradient.setAttribute("y2", "100%");
        } else if (this.direction == 'row') {
            strokeLinearGradient.setAttribute("y2", "0%");
        }
        ratingFraction = this.rating ? (this.rating - Math.floor(this.rating)).toFixed(2) : 0;
        if (this.flow == 'reverse') {
            ratingFraction = 1 - ratingFraction;
            startFill = this.nonratedFill;
            endFill = this.ratedFill;
            startStroke = this.nonratedStroke;
            endStroke = this.ratedStroke;
        }
        //for gradient of fill
        RatedStart.setAttribute("offset", "0%");
        RatedEnd.setAttribute("offset", (ratingFraction * 100) + "%");
        NonRatedStart.setAttribute("offset", (ratingFraction * 100) + "%");
        NonRatedEnd.setAttribute("offset", "100%");
        RatedStart.setAttribute("style", "stop-color:" + startFill);
        RatedEnd.setAttribute("style", "stop-color:" + startFill);
        NonRatedStart.setAttribute("style", "stop-color:" + endFill);
        NonRatedEnd.setAttribute("style", "stop-color:" + endFill);
        //for gradient of stroke
        ratedStrokeStart.setAttribute("offset", "0%");
        ratedStrokeEnd.setAttribute("offset", (ratingFraction * 100) + "%");
        nonratedStrokeStart.setAttribute("offset", (ratingFraction * 100) + "%");
        nonratedStrokeEnd.setAttribute("offset", "100%");
        ratedStrokeStart.setAttribute("style", "stop-color:" + startStroke);
        ratedStrokeEnd.setAttribute("style", "stop-color:" + startStroke);
        nonratedStrokeStart.setAttribute("style", "stop-color:" + endStroke);
        nonratedStrokeEnd.setAttribute("style", "stop-color:" + endStroke);
        linearGradient.appendChild(RatedStart);
        linearGradient.appendChild(RatedEnd);
        linearGradient.appendChild(NonRatedStart);
        linearGradient.appendChild(NonRatedEnd);
        strokeLinearGradient.appendChild(ratedStrokeStart);
        strokeLinearGradient.appendChild(ratedStrokeEnd);
        strokeLinearGradient.appendChild(nonratedStrokeStart);
        strokeLinearGradient.appendChild(nonratedStrokeEnd);
        defs.appendChild(linearGradient);
        defs.appendChild(strokeLinearGradient);
        this.svg.appendChild(defs);
    }

    _createStar() {
        let i, j, startY = 0, startX = 0, xShift = 0, yShift = 0, 
        rating = !this.rating && this.rating != 0 ? this.NofStars : this.rating; //Nofstars 0 check
        //Append if extra needed
        for (i = this.stars.length; i < this.NofStars; i++) {
            let elem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this.svg.appendChild(elem);
            this.stars.push(elem);
        }

        //remove def on update if there is already a def from the beginining
        let defs = this.svg.getElementsByTagName("defs");
        if (defs.length > 0) {
            this.svg.removeChild(defs[0]);
        }
        if (_isFractionalRating(rating)) {
            this._createGradient();
        }

        if (this.direction == 'row') {
            xShift = this.initialSide;
            if (this.justifyContent == 'start') {
                startX = (this.initialSide / 2);
            } 
            else if (this.justifyContent == 'center') {
                startX = (this.initialSide / 2) + ((this.width - (this.initialSide * this.NofStars)) / 2);
            }
            else if (this.justifyContent == 'end') {
                startX = (this.width - (this.initialSide * this.NofStars)) - (this.initialSide / 2);
            } else if (this.justifyContent == 'space-evenly') {
                xShift = this.width / this.NofStars;
                startX = xShift / 2;
                console.log('space-evenly');
            }
            if(this.alignItems == 'center'){
                startY = ((this.initialSide - this.side) / 2) + ((this.height - this.initialSide) / 2);
            }else if(this.alignItems == 'start'){
                startY = ((this.initialSide - this.side) / 2);
            }else if(this.alignItems == 'end'){
                startY = (this.height - this.initialSide); 
            }
        } else if (this.direction == 'column') {
            yShift = this.initialSide;
            if (this.justifyContent == 'start') {
                startY = (this.initialSide - this.side) / 2;
            } else if (this.justifyContent == 'center') {
                startY = ((this.initialSide - this.side) / 2);
            } else if (this.justifyContent == 'end') {
                startY = (this.height - (this.initialSide * this.NofStars));
            } else if (this.justifyContent == 'space-evenly') {
                yShift = this.height / this.NofStars;
                startY = (yShift - this.side) / 2;
            }
            if(this.alignItems == 'center'){
                startX = (this.initialSide / 2) + ((this.width - this.initialSide) / 2);
            }else if(this.alignItems == 'start'){
                startX = this.initialSide / 2;
            }else if(this.alignItems == 'end'){
                startX = this.width - (this.initialSide / 2);
            }
        }

        for (i = 0; i < this.stars.length; i++) {
            this.stars[i].setAttribute('d',
                this._getPath(this.side, startX + (xShift * i), startY + (yShift * i))
            );
        }


        //reverse or not decides filling of star number i.e. star[i]
        for (i = 0; i < this.stars.length; i++) {
            j = this.flow == 'reverse' ? this.stars.length - i - 1 : i;
            if (_isFractionalRating(rating) && Math.ceil(rating) == j + 1) {
                this.stars[i].setAttribute("fill", "url(#partial-fill)");
                this.stars[i].setAttribute("stroke", "url(#partial-stroke)");
            } else {
                this.stars[i].setAttribute("fill", j < Math.ceil(rating) ? this.ratedFill : this.nonratedFill);
                this.stars[i].setAttribute("stroke", j < Math.ceil(rating) ? this.ratedStroke : this.nonratedStroke);
            }
            this.stars[i].setAttribute("stroke-width", this.strokeWidth + "px");
        }

        //Remove from svg
        for (i = this.stars.length - 1; i >= this.NofStars; i--) {
            this.svg.removeChild(this.stars.pop());
        }
    }
    /**
     * Drawing stars update in attribut of svg or path
     * 
     *  @param {Object} attribs attributes to draw stars 
     **/
    update(attribs) {
        if (attribs) {
            if (this._validateAndSet(attribs)) {
                this._createStar();
            } else {
                console.error("Stopping execution");
                return null;
            }
        }
    }
}

export default Rating;