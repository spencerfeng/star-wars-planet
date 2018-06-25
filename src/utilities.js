import axios from 'axios'

export const getPlanets = (url, planets, resolve, reject) => {
  axios.get(url)
    .then(response => {
      const retrivedPlanets = planets.concat(response.data.results)
      if (response.data.next !== null) {
        getPlanets(response.data.next, retrivedPlanets, resolve, reject)
      } else {
        resolve(retrivedPlanets)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
}

// Get items that are in arr1, but not in arr2
export const arrayDiff = (arr1, arr2) => {
  const results = []
  arr1.forEach(item => {
    if (arr2.indexOf(item) < 0) {
      results.push(item)
    }
  })

  return results
}

export const sortPlanetsByRules = (planets, rules) => {
  return planets.sort((p1, p2) => {
    for (let i=0; i<rules.length; i++) {
      const rule = rules[i]
      const column = rule.column
      const direction = rule.direction
      const type = rule.type

      if (direction === 'up') {
        if (type === 'string') {
          if (p1[column].toUpperCase() > p2[column].toUpperCase()) {
            return 1
          }
          if (p1[column].toUpperCase() < p2[column].toUpperCase()) {
            return -1
          }
        }
        if (type === 'number') {
          if (Number(p1[column]) > Number(p2[column])) {
            return 1
          }
          if (Number(p1[column]) < Number(p2[column])) {
            return -1
          }
        }
      }
      if (direction === 'down') {
        if (type === 'string') {
          if (p1[column].toUpperCase() < p2[column].toUpperCase()) {
            return 1
          }
          if (p1[column].toUpperCase() > p2[column].toUpperCase()) {
            return -1
          }
        }
        if (type === 'number') {
          if (Number(p1[column]) < Number(p2[column])) {
            return 1
          }
          if (Number(p1[column]) > Number(p2[column])) {
            return -1
          }
        }
      }
    }

    return 0
  })
}

export const filterPlanetsByRules = (planets, rule) => {
  const column = rule.column
  const ruleName = rule.rule
  const value = rule.value

  if (ruleName === 'beginsWith') {
    return planets.filter(p => {
      return p[column].startsWith(value)
    })
  } else if (ruleName === 'contains') {
    return planets.filter(p => {
      return p[column].includes(value)
    })
  } else if (ruleName === 'equalTo') {
    return planets.filter(p => {
      return p[column] === value
    })
  } else {
    return planets
  }
}

export const snakeCaseToUpperCaseTitle = snakeCaseStr => {
  const arr = snakeCaseStr.split('_')
  
  return arr.map(item => {
    return item.toUpperCase()
  }).join(' ')
}

