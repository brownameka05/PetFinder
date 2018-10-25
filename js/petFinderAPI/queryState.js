let offSetState = {
  from: 0,
  to: 24
}

let queryParams = {
  nPets: 100,
  nShelters: 25,
  offsetPets: 0,
  offsetShelters: 0
}

let userLocation = ""

const setOffSet = (offSetState, n, dir = "forward") => {
  if (dir === "forward") {
    return {
      from: offSetState.to,
      to: offSetState.to + n
    }
  } else if (dir === "back" && offSetState.from !== 0) {
    return {
      from: offSetState.from - n,
      to: offSetState.to - n
    }
  } else {
    return offSetState
  }
}
