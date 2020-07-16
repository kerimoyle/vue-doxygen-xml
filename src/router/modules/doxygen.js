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
  const mainPage = routeTo.params.pageName === undefined
  const pageName = mainPage ? 'index' : routeTo.params.pageName
  const pageStem = getPageStem(routeTo)
  store
    .dispatch('doxygen/fetchPage', {
      page_name: pageName,
      page_stem: pageStem,
      page_url: routeTo.meta.baseURL
    })
    .then(page => {
      routeTo.params.data = page
      if (mainPage) {
        next()
      } else {
        store
          .dispatch('doxygen/fetchDependeePages', {
            page_name: pageName,
            page_stem: pageStem,
            page_url: routeTo.meta.baseURL
          })
          .then(() => {
            next()
          })
      }
    })
}
