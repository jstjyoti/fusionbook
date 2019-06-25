/* eslint-disable react/display-name */
import React from 'react'
import { array } from 'prop-types'
import { Tab } from 'semantic-ui-react'
import { ObjectInspector, chromeDark } from 'react-inspector'
import isObject from '../../../utils/is-object'
chromeDark.BASE_BACKGROUND_COLOR = '#434456'
chromeDark.TREENODE_FONT_SIZE = '13px'
chromeDark.TREENODE_LINE_HEIGHT = 1.4
/**
 * Creates an inspectable ObjectInspector component using the input value.
 *
 * @param {*} x The content which will be renderd as an inspectable entity
 * @param {number} [i = 0] The index of the content
 * @returns {object} An ObjectInspector component
 */
const createInspectable = (x, i = 0) => <ObjectInspector theme={{ ...chromeDark }} data={x} key={i} />

/**
 * Converts the input into its displayable form.
 * - For an array, the displayable form is an array of ObjectInspector
 *   components.
 * - For an object, the displayable form is a single ObjectInspector component.
 * - For anything else, the displayable form is whatever form it is in.
 *
 * @param {*} info The information which needs to be converted to a displayable
 *                 form
 * @returns {*} The displayable form of the input entity
 */
const displayable = info => {
  if (Array.isArray(info)) {
    return info.map(createInspectable)
  } else if (isObject(info)) {
    return createInspectable(info)
  } else {
    return info
  }
}

/**
 * Generates a value for the panes prop of a Tab component.
 *
 * @param {object} contentInfo An object containing raw information about the
 *                             content to be displayed in a Tab.Pane
 * @returns {object} An object containing parsed, displayable information to be
 *                   which will be rendered in a Tab.Pane
 */
const createTabPanes = ({ name, info }) => ({
  menuItem: name,
  render: () => <Tab.Pane>{displayable(info)}</Tab.Pane>
})

/**
 * A React Component which displays a set of Tabs containing meta information
 * about the current chapter of the story
 *
 * @param {object} props Contains the properties for the MetaInfo component
 * @returns {object} React element representing a MetaInfo component
 */
const MetaInfo = ({ tabs }) => {
  if (tabs.length) {
    return (
      <Tab panes={tabs.map(createTabPanes)} className='footer' />
    )
  } else {
    return []
  }
}

MetaInfo.propTypes = {
  tabs: array
}

export default MetaInfo