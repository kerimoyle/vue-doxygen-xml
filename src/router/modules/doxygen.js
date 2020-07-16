import store from '@/store'

export const getPageStem = routeTo => {
  let stem = routeTo.path
  if (routeTo.params.pageName) {
    const n = routeTo.path.lastIndexOf('/')
    stem = routeTo.path.slice(0, n) //`/${routeTo.params.pageName}`, '')
  }
  return stem
}

export const updateDoxygenRoute = (routeTo, next) => {
  const mainPage = !Object.prototype.hasOwnProperty.call(
    routeTo.params,
    'pageName'
  )
  const pageName = mainPage ? 'index' : routeTo.params.pageName
  const pageStem = getPageStem(routeTo)
  store
    .dispatch('doxygen/fetchPage', {
      page_name: pageName,
      page_stem: pageStem
    })
    .then(page => {
      routeTo.params.data = page
      if (mainPage) {
        next()
      } else {
        store
          .dispatch('doxygen/fetchDependeePages', {
            page_name: pageName,
            page_stem: pageStem
          })
          .then(() => {
            next()
          })
      }
    })
}
