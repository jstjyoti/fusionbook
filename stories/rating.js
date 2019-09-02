import { Story, notes, configs } from '../src/lib/story'
import star from '../components/html/rating'

const ratingStory = new Story('Rating').addMetas([configs()])

ratingStory.addChapter(
  'vertical',
  story => {
    star(story,200, 200, {
      "fill": "blue",
      "stroke": "red",
      "stroke-width": "1",
      "stroke-linejoin":"miter" 
    },"row") 
  },
  [
    notes('This is vertical square stars.')
  ]
)

ratingStory.addChapter(
  'horizontal',
  story => {
    star(story,200, 200, {
      "fill": "blue",
      "stroke": "red",
      "stroke-width": "1",
      "stroke-linejoin":"miter" 
    },"column")
  },
  [
    notes('This is horizontal square stars.')
  ]
)

export default ratingStory
