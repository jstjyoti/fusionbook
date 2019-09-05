import { Story, notes, configs } from '../src/lib/story'
import Rating from '../components/html/rating'
//import { NONAME } from 'dns';

const ratingStory = new Story('Rating').addMetas([configs()])
ratingStory.addChapter(
  'Default Value testing',
  story => {
    let newRating = new Rating(story)
  },
  [
    notes('Rating with default values in obj')
  ]
)
ratingStory.addChapter(
  'Invalid Container',
  story => {
    let rating =new Rating("story");
  },
  [
    notes('Error message missing of having garbage value to find where to append the stars')
  ]
)
ratingStory.addChapter(
  'height and width values less than 10',
  story => {
    let rating = new Rating(story,{
      "height": 2,
      "width": 2
    });
    setTimeout(function(){
      rating.update({
        "height": 800
      });
    }, 3000);
  },
  [
    notes('for this case show an error message and set height and width to default then updation occurs after 3 second')
  ]
)
ratingStory.addChapter(
  'width heigh in % then update in px testing',
  story => {
    let rating = new Rating(story, {
        "height": "200%", 
        "width": "100%"
      });
    setTimeout(function(){
      rating.update({
        "width": 800, 
        "height": 600
      });
    }, 3000);
  },
  [
    notes('show 5 stars with svg of specified height and width and then update height and width after 3 second')
  ]
)

ratingStory.addChapter(
  'height width update with garbage and undefined testing',
  story => {
    let rating = new Rating(story, {
      "width": "500px", 
      "height":"800px"
    });
    setTimeout(function(){
      rating.update({
        "width": "abcd",
        "height": undefined
      });
    }, 3000);
  },
  [
    notes('show 5 stars with svg of specified height and width and then should show a error then fallback to previous state')
  ]
)
ratingStory.addChapter(
  'Width or Height value not a number testing',
  story => {
    let rating = new Rating(story, {
      "width": "abcd", 
      "height":"800"
    });
    setTimeout(function(){
      rating.update({
        "width": "abcd",
        "height": undefined
      });
    }, 3000);
  },
  [
    notes('For any of width or height NaN the stars should fallback to initial hight width and then updating ')
  ]
)

ratingStory.addChapter(
  'stroke-width without style attributes',
  story => {
    let rating = new Rating(story, {
      "stroke-width": '5',
    });
  },
  [
    notes('5 star rating 5px stroke-width with default styles color none(not visible)')
  ]
)

ratingStory.addChapter(
  'stroke-width with style attributes',
  story => {
    let rating = new Rating(story, {
      "stroke-width": '5',
      "rated":{
        "stroke": "#000"
      },
      "nonrated":{
        "stroke": "#ff0"
      }
    });
  },
  [
    notes('5 star with stroke-width 5px with combined-styles for rated as yellow-black and  nonrated as grey-red')
  ]
)

ratingStory.addChapter(
  'large stroke-width',
  story => {
    let rating = new Rating(story, {
      "stroke-width": '100',
      "rated":{
        "stroke": "#000"
      },
      "nonrated":{
        "stroke": "#ff0"
      }
    });
  },
  [
    notes('5 star without strokes but raise a error as stroke-with is not managable and fallback to default none stroke width')
  ]
)
ratingStory.addChapter(
  'negative stroke width',
  story => {
    let rating = new Rating(story, {
      "stroke-width": '-5',
      "rated":{
        "fill": "#ff0",
        "stroke": "#000"
      },
      "nonrated":{
        "fill": "#fff",
        "stroke": "#ff0"
      }
    });
  },
  [
    notes('stroke-width -5 results raising an error nagative stroke width falling back to default stroke-width')
  ]
)
ratingStory.addChapter(
  'On update consecutively fallback to prev state',
  story => {
    let rating = new Rating(story, {
      "width": 1200, 
      "height": 600, 
      "rated":{
        "fill": "#f00",
        "stroke": "#000"
      },
      "nonrated":{
        "fill": "#ddd",
        "stroke": "#ff0"
      }
    });

    setTimeout(function(){
      rating.update({
        "rating": 10.2,
        "stars": 5,
        "rated":{
          "fill": "#000",
          "stroke": "#f00"
        },
        "nonrated":{
          "fill": "#ddd",
          "stroke": "#ff0"
        }
      });

      setTimeout(function(){
        rating.update({
          "rating": 3.8,
          "stars": 5
        })
      }, 3000);
    }, 3000);
  },
  [
    notes('full 5 stars first after 3s an error raised but update happens for other attributes and rollback to previous. In next update after 3 more second it should take fill and stroke from its previous state as rated red-black nonrated grey-yellow')
  ]
)

ratingStory.addChapter(
  'Rated fill in RGB',
  story => {
    let rating = new Rating(story, {
      "rating": 3.5,
      "rated":{
        "fill": "rgb(255,0,0)"
      }
    });
  },
  [
    notes('Rated fill of rating 4.5/5 should have rated fill color red')
  ]
)

ratingStory.addChapter(
  'Incorrect hex  Rated fill',
  story => {
    let rating = new Rating(story,{
      "rating": 3.5,
      "rated":{
        "fill": "#xyz"
      }  
    });
  },
  [
    notes('4.5/5 with default fill color and raise error notifying improper hex code')
  ]
)

ratingStory.addChapter(
  'Nonrated fill color',
  story => {
    let rating = new Rating(story, {
      "rating": 3.5,
      "nonrated":
      {
        "fill": "#00f"
      }
      
    });
  },
  [
    notes('4.5/5 with default fill color for rated but nonrated fill is blue')
  ]
)

ratingStory.addChapter(
  'Nonrated fill rgb',
  story => {
    let rating = new Rating(story, {
      "rating": 4,
      "nonrated":{
        "fill":"rgb(255,0,0)"
      }
    });
  },
  [
    notes('4 rated stars  with default rated fill but nonrated fill is assigned value')
  ]
)

ratingStory.addChapter(
  'invalid Nonrated fill color',
  story => {
    let rating = new Rating(story, {
      "rating": 3.5,
      "nonratd": {
        "fill":"#xyz"
      }
    });
  },
  [
    notes('3.5/5 with default fill color for both rated and non-rated but logging an error')
  ]
)
ratingStory.addChapter(
  'Justify content space-evenly',
  story => {
    let rating = new Rating(story, {
      "justify-content": "space-evenly",
      "height": 100,
      "width": "100%"
    });
  },
  [
    notes('5/5 stars space-evenlyed to whole width with defaults')
  ]
)

ratingStory.addChapter(
  'Justify content center',
  story => {
    let rating = new Rating(story, {
      "justify-content": "center",
      "height": '100px',
      "width": "100%"
    });
  },
  [
    notes('5/5 stars at center of whole width with defaults')
  ]
)

ratingStory.addChapter(
  'Justify content start',
  story => {
    let rating = new Rating(story, {
      "justify-content": "start",
      "height": 100,
      "width": "100%"
    });
  },
  [
    notes('Should visualize 5/5 rating from left')
  ]
)

ratingStory.addChapter(
  'Justify content end',
  story => {
    let rating = new Rating(story, {
      "justify-content": "end",
      "height": 100,
      "width": '100%'
    });
  },
  [
    notes('Should visualize 5/5 rating at right end i.e. everything else default')
  ]
)

ratingStory.addChapter(
  'Justify content space-evenly with orientation bottom-to-top',
  story => {
    let rating = new Rating(story, {
      "rating":"2.5",
      "justify-content": "space-evenly",
      "orientation": "bottom-to-top",
      "height": 1200,
      "width": 100
    });
  },
  [
    notes('Should visualize 5/5 rating taking the whole width and fill flow from bottom')
  ]
)
ratingStory.addChapter(
  'Justify content end with orientation top-to-bottom',
  story => {
    let rating = new Rating(story, {
      "justify-content": "end",
      "orientation": "top-to-bottom",
      "height": '300px',
      "width": '100%'
    });
  },
  [
    notes('Should visualize 5/5 rating vertically but alignment from bottom')
  ]
)
ratingStory.addChapter(
  'padding of 5',
  story => {
    let rating = new Rating(story, {
      "justify-content": "center",
      "height": 100,
      "width": 600,
      "padding": 5
    });
  },
  [
    notes('Should visualize 5/5 rating at center horizontally with padding 5')
  ]
)

ratingStory.addChapter(
  'padding < 2 or negative',
  story => {
    let rating = new Rating(story, {
      "justify-content": "center",
      "height": 100,
      "width": 1200,
      "padding": 0
    });
  },
  [
    notes('Should visualize 5/5 rating taking default padding 2 and raise an error')
  ]
)

ratingStory.addChapter(
  'large padding',
  story => {
    let rating = new Rating(story, {
      "justify-content": "center",
      "height": 100,
      "width": 1200,
      "padding": 100
    });
  },
  [
    notes('default padding 2 is opted and error notifying non-managable padding on console is shown')
  ]
)

ratingStory.addChapter(
  'orientation initially left-to-right then updating to garbage',
  story => {
    let rating = new Rating(story, {
      "width": 800, 
      "height": 600, 
      "rating": 4.5, 
      "stars": 5,
      "orientation": "left-to-right"
    });
    setTimeout(function(){
      rating.update({
        "orientation": "right-to-left"
      });
        
      setTimeout(function(){
        rating.update({
          "orientation": "garbage"
        });
      }, 3000);

    }, 3000);
  },
  [
    notes('4.5 of 5 horizontally and orientation should be left-to-right after 3s orientation should be right-to-left and after 6s it should show error but remain in prevous state')
  ]
)

ratingStory.addChapter(
  ' Rating orientation bottom-to-top',
  story => {
    let rating = new Rating(story,{
      "rating": 4.5,
      "orientation": "bottom-to-top"
    });
  },
  [
    notes('Should visualize 4.5/5 vertically and fill flow should be bottom to up')
  ]
)

ratingStory.addChapter(
  'orientation top-to-bottom',
  story => {
    let rating = new Rating(story, {
      "rating": 4.5,
      "orientation": "top-to-bottom"
    });
  },
  [
    notes('4.5/5 vertically from top to bottom')
  ]
)

ratingStory.addChapter(
  ' orientation initially left-to-right then right-to-left',
  story => {
    let rating = new Rating(story, {
      "rating": 4.5,
      "orientation":"left-to-right"
    });
    setTimeout(function(){
      rating.update({
        "orientation": "right-to-left"
      });
    }, 3000);
  },
  [
    notes('Should visualize 4.5/5 left to right then right to left')
  ]
)

ratingStory.addChapter(
  'Rating orientation top-to-bottom align-items start',
  story => {
    let rating = new Rating(story, {
      "rating": 4.5,
      "orientation": "top-to-bottom",
      "align-items": "start"
    });
  },
  [
    notes('Should visualize 4.5/5 vertically and fill flow should be top to bottom rating should be left align')
  ]
)

ratingStory.addChapter(
  'Rating orientation top-to-bottom align-items end',
  story => {
    let rating = new Rating(story, {
      "height":'200%',
      "width":'100%',
      "rating": 2.5,
      "stars":6,
      "orientation": "top-to-bottom",
      "align-items": "end",
      "justify-content":"start"

    });

    setTimeout(function(){
      rating.update({
        "orientation": "right-to-left",
        "align-items": "end",
        "justify-content":"end"
      });
      setTimeout(function(){
        rating.update({
          "orientation": "right-to-left",
          "align-items": "end",
          "justify-content":"center"
      });
        setTimeout(function(){
          rating.update({
            "orientation": "right-to-left",
            "align-items": "end",
            "justify-content":"end"
        });
          setTimeout(function(){
            rating.update({
              "orientation": "right-to-left",
              "align-items": "end",
              "justify-content":"space-evenly"
          });
            setTimeout(function(){
              rating.update({
                "orientation": "right-to-left",
                "align-items": "start"
              })
                setTimeout(function(){
                  rating.update({
                    "orientation": "right-to-left",
                    "align-items": "center"
                  })
                }, 3000);
              }, 3000);
            }, 3000);
          },3000);
        },3000);
      },3000);
  },
  [
    notes('Should visualize 4.5/5 vertically and fill flow should be top to bottom rating should be right align after 3s it should be horizontal and bottom align after 6s horizontal top align')
  ]
)

ratingStory.addChapter(
  'Only number of stars is given',
  story => {
    let rating = new Rating(story,{
      "stars": 10
    });
  },
  [
    notes('Should visualize 10/10 rating')
  ]
)

ratingStory.addChapter(
  'number of stars in negative',
  story => {
    let rating = new Rating(story, {
      "width": 1200, 
      "height": 600, 
      "rating": 0, 
      "stars": -10
    });
  },
  [
    notes('Should show error notifying no of stars is negative and stop execution')
  ]
)
ratingStory.addChapter(
  'number of stars is garbage',
  story => {
    let rating = new Rating(story,{
      "stars":"garbage"
    });
  },
  [
    notes('Should show error notifying no of stars must be numeric value but execute with default rating 5/5 inside default svg size')
  ]
)

ratingStory.addChapter(
  'Checking zero rating',
  story => {
    let rating = new Rating(story, { 
      "rating": 0 
    });
  },
  [
    notes('Should visualize 0/5')
  ]
)
ratingStory.addChapter(
  'rating in default and update',
  story => {
    let rating = new Rating(story, {
      "rating": 2.69
    });
    setTimeout(function(){
      rating.update({
        "rating":4.5
      });
    }, 3000);
  },
  [
    notes('')
  ]
)
ratingStory.addChapter(
  'rating > number of stars',
  story => {
    let rating = new Rating(story, {
      "width": 1200, 
      "height": 600, 
      "rating": 12, 
      "stars": 10
    });
  },
  [
    notes('Should show error notifying rating is greater than no of stars and stop execution')
  ]
)

ratingStory.addChapter(
  'Rating on default Stars and updating rating and stars',
  story => {
    let rating = new Rating(story, {
      "width": "1200", 
      "height": 600, 
      "rating": 3.78
    });
    setTimeout(function(){
      rating.update({
        "rating":5.8, 
        "stars": 10
      });
    }, 3000);
  },
  [
    notes('show 3.78 in 5 stars and then will show 5.8 in 10 stars')
  ]
)

ratingStory.addChapter(
  'garbage and -ve value on update of rating',
  story => {
    let rating = new Rating(story, {
      "width": 1200, 
      "height": 600, 
      "rating": 5.5, 
      "stars": 8,
      "ratedFill":"#00f",

    });
    setTimeout(function(){
      rating.update({
        "stars": 20
      });
      setTimeout(function(){
        rating.update({
          "rating": -1, 
          "stars": 20
        });
      }, 3000);
    }, 3000);
  },
  [
    notes('show 5.5 out of 8, after 3s no of stars should be 20 and after 6s should say error and fallback to previous state')
  ]
)

ratingStory.addChapter(
  'On update invalid no attributes changes  test',
  story => {
    let rating = new Rating(story, {
      "width": 1200, 
      "height": 600, 
    });

    setTimeout(function(){
      rating.update({
        "width": 1400,
        "height": 600,
        "rating": 10.2,
        "stars": 5
      })
    }, 3000);
  },
  [
    notes('First it should visualize 5/5 rating then raise error after 3s but do not update width and height')
  ]
)
ratingStory.addChapter(
  'rating update error test',
  story => {
    let rating = new Rating(story, {
      "width": 1200, 
      "height": 600, 
      "stars": 10,
      "rating": 9.6
    });

    setTimeout(function(){
      rating.update({
        "stars": 5
      });
      setTimeout(function(){
        rating.update({
          "stars": 10
        });
      },3000);
    }, 3000);
  },
  [
    notes('First it should visualize 9.6/10 rating then it should give an error as 9.6/5 is not possible')
  ]
)

ratingStory.addChapter(
  'rating update null test',
  story => {
    let rating = new Rating(story, {
      "width": 1200, 
      "height": 600, 
      "stars": 10
    });

    setTimeout(function(){
      rating.update({
        "stars": 5
      });
      setTimeout(function(){
        rating.update({
          "stars": "null"
        });
      }, 3000);
    }, 3000);
  },
  [
    notes('First it should visualize 10/10 rating then it should visualize 5/5 rating')
  ]
)
ratingStory.addChapter(
  'all attributes check',
  story => {
    let rating = new Rating(story, {
      "justify-content": "space-evenly",
      "orientation": "top-to-bottom",
      "height": 1200,
      "width": 1200,
      "padding": 10,
      "rated":{
      "fill": "#ff0000",
      "stroke": "#00f"
      },
      "nonrated":{
      "fill": "ddd",
      "stroke": "#ff0",
      },
      "stroke-width": 5,
      "stars": 10,
      "rating":6.8
    });
  },
  [
    notes('8.6/10 rating verticallylignment from bottom')
  ]
)
ratingStory.addChapter(
  'Internal-Constraint BBox',
  story=>{

  },
  [
    notes('BBox of stars are always square and path is drawn in such a way that internal lines are not visible')
  ]
)
export default ratingStory