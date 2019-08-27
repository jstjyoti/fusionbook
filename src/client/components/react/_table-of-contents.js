import React, { Component, Fragment } from 'react'
import { array, func } from 'prop-types'
import SeacrhBar from './search-bar'
import { Accordion, Icon, List } from 'semantic-ui-react'

class TableOfContents extends Component {
  constructor (props) {
    super(props)

    this.state = { activeIndex: 0 }
    this.handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index

      this.setActiveIndex(newIndex)
    }
    this.setActiveIndex = index => {
      this.setState({
        activeIndex: index
      })
    }
  }

  createStories () {
    let { activeIndex } = this.state
    let { stories, handleChapterClick } = this.props
    let createChapters = (chapters, storyIndex) => {
      return chapters.map((chapter, id) => (
        <List.Item key={id} onClick={() => {
          handleChapterClick(storyIndex, id)
        }}>
          {chapter.name}
        </List.Item>
      ))
    }

    return stories.map((story = {}, idx) => (
      <Fragment key={idx}>
        <Accordion.Title active={activeIndex === idx} index={idx} onClick={this.handleClick}>
          <Icon name='dropdown' />
          {story.name}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === idx}>
          <List bulleted>
            {createChapters(story.chapters, idx)}
          </List>
        </Accordion.Content>
      </Fragment>
    ))
  }
  render () {
    let { stories } = this.props
    return (
      <div className="sidebar">
        <h2>FusionBook</h2>
        <SeacrhBar stories={stories.map(({ name }) => {
          return {
            title: name
          }
        })} setActiveIndex={this.setActiveIndex}/>
        <Accordion>
          {this.createStories()}
        </Accordion>
      </div>
    )
  }
}

TableOfContents.propTypes = {
  stories: array,
  handleChapterClick: func
}

export default TableOfContents