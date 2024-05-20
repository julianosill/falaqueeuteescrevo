import {
  type AutoAnimationPlugin,
  getTransitionSizes,
} from '@formkit/auto-animate'

export const customAnimation: AutoAnimationPlugin = (
  el,
  action,
  oldCoords,
  newCoords,
) => {
  let keyframes: Keyframe[] = []

  if (action === 'add') {
    keyframes = [
      { transform: 'scale(0.95)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 },
    ]
  }

  if (action === 'remove') {
    keyframes = [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0.95)', opacity: 0 },
    ]
  }

  if (action === 'remain' && oldCoords && newCoords) {
    const deltaX = oldCoords.left - newCoords.left
    const deltaY = oldCoords.top - newCoords.top
    const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
      el,
      oldCoords,
      newCoords,
    )

    const start: Keyframe = { transform: `translate(${deltaX}px, ${deltaY}px)` }
    const end: Keyframe = { transform: 'translate(0, 0)' }

    if (widthFrom !== widthTo) {
      start.width = `${widthFrom}px`
      end.width = `${widthTo}px`
    }

    if (heightFrom !== heightTo) {
      start.height = `${heightFrom}px`
      end.height = `${heightTo}px`
    }

    keyframes = [start, end]
  }

  return new KeyframeEffect(el, keyframes, {
    duration: 200,
    easing: 'ease-out',
  })
}
