const getLocation = () => {
  return `query {
    location {
      id
    }
  }
  `
}

export { getLocation }