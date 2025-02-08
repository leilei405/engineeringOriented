import { markUpdateLaneFromFiberToRoot } from './ReactFiberConcurrentUpdates'

function initializeUpdateQueue (fiber) {
  fiber.updateQueue = {
    shared: {
      pending: null,
    }
  }
}

function createUpdate () {
  return {}
}

/**
 * 将更新对象添加到fiber节点的更新队列中
 * @param { fiber } fiber - 需要添加更新的fiber节点
 * @param { update } update - 待添加的更新对象
 */
function enqueueUpdate (fiber, update) {
  const updateQueue = fiber.updateQueue
  const sharedQueue = updateQueue.shared
  const pending = sharedQueue.pending

  if (pending === null) {
    update.next = update
  } else {
    update.next = pending.next
    pending.next = update
  }
  sharedQueue.pending = update
  return markUpdateLaneFromFiberToRoot(fiber)
}

export {
  initializeUpdateQueue,
  createUpdate,
  enqueueUpdate
}