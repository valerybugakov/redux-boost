const executor = async (...args) => {
  try {
    const resp = await fetch(...args)
    const json = await resp.json()

    return json
  } catch (err) {
    throw err
  }
}

export default executor
