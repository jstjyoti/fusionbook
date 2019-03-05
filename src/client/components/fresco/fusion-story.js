import SmartRenderer from '../../../../../fc-core/src/component-interface/smart-renderer'
import AnimationManager from '../../../../../fc-core/src/animation-manager'
import Raphael from '../../../../../fc-core/src/_internal/vendors/redraphael/source/raphael'

const animationManagerFactory = fusionStory => {
  const animationManager = fusionStory.attachChild(
    AnimationManager,
    'animationManager'
  )

  animationManager.addToEnv('chart', fusionStory)
  animationManager.setAnimationState('default')
}

class FusionStory extends SmartRenderer {
  constructor () {
    super()

    this.registerFactory('animationManager', animationManagerFactory)
  }

  configureAttributes (config = {}) {
    Object.assign(this.config, config)

    this.addToEnv('core-options', {})
    this.addToEnv('chartInstance', { args: {} })
  }

  draw () {
    const animationManager = this.getChildren('animationManager')[0]
    this.addToEnv('animationManager', animationManager)
    animationManager.addToEnv('paper', Raphael('fusionbook-root', 600, 600))
  }
}

export default FusionStory
