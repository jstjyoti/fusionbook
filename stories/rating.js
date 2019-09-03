import { Story, notes, configs } from '../src/lib/story'
import cStar from '../components/html/rating'

const ratingStory = new Story('Rating').addMetas([configs()])
ratingStory.addChapter(
  'Default Single star',
  story => {
    cStar(story, "400px", "100px", 'row', {
      "rated" :{"fill": "#fff",
        "stroke": "#000"
      }
    },1,1)
  },
  [
    notes('Single square star')
  ]
)

ratingStory.addChapter(
  'Single star with particular(blue here) fill color',
  story => {
    cStar(story, "400px", "100px", 'row', {
      "rated":{
       "fill": "blue",
        "stroke": "#000"
      }
    },1,1)
  },
  [
    notes('Single square star having fill color blue')
  ]
)

ratingStory.addChapter(
  'stroke-width testing',
  story => {
    cStar(story, "500px", "400px", 'row', {
        "rated":{"fill": "blue",
        "stroke": "#000",
        "stroke-width": "20px"
      }
    },1,1)
  },
  [
    notes('star won\'t be deformed even for thicker stroke-width' )
  ]
)
ratingStory.addChapter(
  'stroke-color testing',
  story => {
    cStar(story, "500px", "400px", 'row', {
      "rated":{
        "fill": "blue",
        "stroke": "red",
        "stroke-width": "5px"
      }
    },1,1)
  },
  [
    notes('star with any particular Stroke color')
  ]
)
ratingStory.addChapter(
  'svg with single-star having height-width %',
  story => {
    cStar(story, "50%", "60%", 'row', {
        "rated":{"fill": "#fff",
        "stroke": "#000",
        "stroke-width":"2"
        }
    },1,1)
  },
  [
    notes('Height-width of svg in %')
  ]
)

ratingStory.addChapter(
  'svg with 0 height-width testing',
  story => {
   
    cStar(story,0,0, 'row', {
        "rated":{"fill": "#fff",
        "stroke":"#000",
        "stroke-width":"2"
    }
  },1,1)
  },
  [
    notes('svg with missing params later i can add a check for style as well and go with missing params inside style object')
  ]
)


ratingStory.addChapter(
  'svg with incorrect height-width testing',
  story => {
    debugger
    cStar(story,"abc","xyz", 'row', {
      "rated":{"fill": "#fff",
      "stroke":"#000",
      "stroke-width":"2"
      }
    },1,1)
  },
  [
    notes('svg with wrong height width ,error message recieved ..so user must provide correct numeric values ')
  ]
)

ratingStory.addChapter(
  'svg with fraction height width testing',
  story => {
    debugger
    cStar(story,100.2,200.25, 'row', {
      "rated":{"fill": "#fff",
      "stroke":"#000",
      "stroke-width":"2"
      }
    },1,1)
  },
  [
    notes('svg with fractional values of height width gives correct result')
  ]
)

ratingStory.addChapter(
  'svg with missing parameters(height-width) in cStar',
  story => {
    
    cStar(story, 'row', {
      "rated":{"fill": "#fff",
      "stroke":"#000",
      "stroke-width":"2"
      }
    },1,1)
    
  },
  [
    notes('svg with missing params later i can add a check for style as well and go with missing params inside style object')
  ]
)

ratingStory.addChapter(
  'Any number of star testing',
  story=>{
    cStar(story,"200","200",{
      "rated":{"fill": "#fff",
      "stroke":"#000",
      "stroke-width":"5"
      }
    },20,20)
  },
  [
    notes('svg with any Number of star')
  ]
)

ratingStory.addChapter(
  'Wrong-direction testing',
  story=>{
    cStar(story,"200","200","abc",{
    rated:{"fill":"#fff",
      "stroke":"000",
      "stroke-width":"5"
    }
    },2,2)
  },
  [
    notes("direction isn\'t row or column")
  ]

)

ratingStory.addChapter(
  'Any other wrong style information',
  story=>{
    cStar(story,"200","200","row",{
      "rated":{"fill":"abc",
      "stroke":"000",
      "stroke-width":"5",
      "float":"left"
    }
    },1,1)
  },
  [
    notes('star with wrong styles must show invalid Style Provided message to user')
  ]
)

ratingStory.addChapter(
  'Horizontal rating',
  story => {
    cStar(story, "400px", "100px", 'row', {
    "rated":{"fill": "#ff0",
      "stroke": "#000"
    } ,
    "unrated":{"fill": "#ddd",
    "stroke": "#000"
    }
    },5,4)
  },
  [
    notes('Horizontal five-star rating showing stars horizontally')
  ]
)


ratingStory.addChapter(
  'Vertical rating',
  story => {
    cStar(story, "400px", "100px", 'column', {
      "rated":{"fill": "blue",
      "stroke": "#000"
    } ,
    "unrated":{"fill": "purple",
    "stroke": "#000"
    }
    },5,4)
  },
  [
    notes('Vertical five-star rating showing stars vertically')
  ]
)

ratingStory.addChapter(
  'width and height svg in percentage testing',
  story => {
    cStar(story, "50%", "50%", 'row', {
      "rated":{"fill": "blue",
      "stroke": "#000"
    } ,
    "unrated":{"fill": "purple",
    "stroke": "#000"
    }
    },5,5)
  },
  [
    notes('Horizontal five-star rating showing stars horizontally where width and height is in %')
  ]
)
ratingStory.addChapter(
  'width and height in percentage vertical testing',
  story => {
    cStar(story, "50%", "50%", 'column', {
      "rated":{"fill": "blue",
      "stroke": "#000"
    } ,
    "unrated":{"fill": "purple",
    "stroke": "#000"
    }
    },5,5)
  },
  [
    notes('vertical five-star rating showing stars horizontally where width is in %')
  ]
)

ratingStory.addChapter(
  'Justify Content stretch testing',
  story => {
    cStar(story, "1000px", "100px", 'row', {
      "rated":{"fill": "blue",
      "stroke": "#000"
    } ,
    "unrated":{"fill": "purple",
    "stroke": "#000"
    }
    },3,3)
  },
  [
    notes('Horizontal rating showing stars automatic adjust space between stars')
  ]
)

ratingStory.addChapter(
  'Justify Content center testing',
  story => {
    cStar(story, "1000px", "100px", 'row', {
      "rated":{"fill": "blue",
      "stroke": "#000"
    },
    "unrated":{"fill": "purple",
    "stroke": "#000"
    }
    },3,3)
  },
  [
    notes('Horizontal rating showing stars center with required space only')
  ]
)
ratingStory.addChapter(
  'default no style provided rating vertical-testing',
  story => {
    cStar(story, "400px", "100px", 'column', {

    },5,4.5)
  },
  [
    notes('five-star rating with different color showing stars vertically')
  ]
)

ratingStory.addChapter(
  'default no style provided rating vertical-testing',
  story => {
    cStar(story, "400px", "100px", 'row', {

    },5,4.5)
  },
  [
    notes('five-star rating with different color showing stars horizontally')
  ]
)


ratingStory.addChapter(
  'color-variable rating vertical-testing',
  story => {
    cStar(story, "400px", "100px", 'column', {
      "rated":{"fill": "blue",
      "stroke": "#000"
    } ,
    "unrated":{"fill": "purple",
    "stroke": "#000"
    }
    },5,4.5)
  },
  [
    notes('five-star rating with different color showing stars vertically')
  ]
)

ratingStory.addChapter(
  'color-variable rating Horizontal testing',
  story => {
    cStar(story, "400px", "100px", 'row', {
      "rated":{"fill": "#ff0",
       "stroke": "#000"
     } ,
     "unrated":{"fill": "#fff",
     "stroke": "#000"
     },
   },5,3.5)
  },
  [
    notes('five-star rating with different color showing stars horizontal')
  ]
)

ratingStory.addChapter(
  'stroke-variable in rating vertical testing',
  story => {
    cStar(story, "400px", "100px", 'column', {
      "rated":{"fill": "blue",
      "stroke": "green"
    } ,
    "unrated":{"fill": "purple",
    "stroke": "blue"
    }
    },5,4)
  },
  [
    notes('five-star rating with different color showing stars horizontal')
  ]
)

export default ratingStory