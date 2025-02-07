function initializeUpdateQueue (fiber) {
  fiber.updateQueue = {
    shared: {
      pending: null,
    }
  }
}

export {
  initializeUpdateQueue
}