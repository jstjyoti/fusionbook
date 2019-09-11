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
  'height and width values less than 10 then update height too 800',
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
  'height width update with garbage and undefined or nan testing',
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
      "rating":"3.5",
      "stroke-width": '-5',
      "rated":{
        "fill": "#0000ff",
        "stroke": "#00ffff"
      },
      "nonrated":{
        "fill": "#00ffff",
        "stroke": "#0000ff"
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
        "fill": "#00f",
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
  'Nonrated fill color in hex',
  story => {
    let rating = new Rating(story, {
      "rating": 3.5,
      "orientation":"top-to-bottom",
      "nonrated":
      {
        "fill": "#f00"
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
      "rating": 3.5,
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
      "width": 1200
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
      "height": '100',
      "width": 1200,
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
      "width": 1200
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
      "width": 1200
    });
  },
  [
    notes('Should visualize 5/5 rating at right end i.e. everything else default')
  ]
)


ratingStory.addChapter(
  'padding of 5',
  story => {
    let rating = new Rating(story, {
      "justify-content": "center",
      "height": 100,
      "width": 1200,
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
      "width":1200,
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
  'Rating orientation top-to-bottom align-items combinations',
  story => {
    let rating = new Rating(story, {
      "width":1200,
      "height":1000,
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
    notes('2.5 stars of 5 vertically and fill flow should be top to bottom rating should be right align after 3s it should be horizontal and bottom align after 6s horizontal top align and after each 3 seconds the alignment and justify content changes')
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
      "stars":"asdfghjk"
    });
  },
  [
    notes('Should show error notifying no of stars must be numeric value but execute with default rating 5/5 inside default svg size')
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
        "width": '100%', 
        "height": '100%', 
        "stars": 10
      });
  
      setTimeout(function(){
        rating.update({
          "stars": 5
        });
        setTimeout(function(){
          rating.update({
            "stars": 15
          });
        }, 3000);
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
  'Performance check',
  story =>{
    let rating=new Rating(story);
    var c=0;
    let startTimer=new Date()*1;
    let curTime=0;
      while(curTime<=100){
        rating.update({
          "rating":(0.5+c)%5
          });
          c+=1;
          curTime=(new Date()*1)-startTimer;
      }
    console.log("no. of times "+c);
  },
  [
    notes('number of times update happened will be loggegd as ... no. of times')
  ]
)
ratingStory.addChapter(
  'API user method check',
  story =>{
    let rating=new Rating(story);
    rating.onUpdate=function(){
      console.log("inside Onupdate");
    }
    rating.onDraw=function(){
      console.log("inside OnDraw");
    }
    setTimeout(rating.update({
      "rating":4.5
    }),1000)
   
  },
  [
    notes('api methods attached and called after update and draw respectively')
  ]
)



ratingStory.addChapter(
  'height and width update performance check',
  story =>{
    let rating=new Rating(story);
    var c=0;
    let startTimer=new Date()*1;
    let curTime=0;
      while(curTime<=100){
        rating.update({
          "height":500,
          "width":500
          });
          c+=1;
          curTime=(new Date()*1)-startTimer;
      }
    console.log("no. of times "+c);
  },
  [
    notes('dom interaction and tasks or microtasks created checking based on no. of task executed in 100ms')
  ]
  
)


ratingStory.addChapter(
  'server sends update rating',
  story =>{
    let rating=new Rating(story);
     let updateCount=0,
     drawCount=0,
     startTimer=new Date()*1,
     curTime=0
     rating.onUpdate=function(){
       updateCount++
     }
     rating.onDraw=function(){
        drawCount++
     }
     var source=new EventSource('http://localhost:3000/serversse');
     source.onmessage=function(msg){
        console.log('Drawing in '+curTime+'ms ... _draw() called '+drawCount+'times ...update called '+updateCount+'times');
         rating.update({
           "rating":+(msg.data)
         })
       curTime=(new Date()*1)-startTimer;
     }
  },
  [
    notes('dom interaction and tasks or microtasks created checking based on no. of task executed in 100ms')
  ]
  
)
ratingStory.addChapter(
  'Internal-Constraint BBox',
  story=>{
    let rating=new Rating(story);
  },
  [
    notes('BBox of stars are always square and path is drawn in such a way that internal lines are not visible')
  ]
)


export default ratingStory