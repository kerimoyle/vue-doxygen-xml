import DoxygenService from '@/services/DoxygenService'
import { parsePage } from '@/js/doxygenparser'

export const namespaced = true

export const state = {
  pages: []
}

export const mutations = {
  APPEND_PAGE(state, page) {
    state.pages.push(page)
  }
}

export const actions = {
  fetchPage({ commit }, page_name) {
    return DoxygenService.getPage(page_name).then(response => {
      const page = parsePage(page_name, response.data)
      commit('APPEND_PAGE', page)
      return page
    })
  },
  fetchDependeePages({ commit, getters }, { pageName }) {
    const dependentPage = getters.getPageById(pageName)
    let pageNames = []
    if (dependentPage) {
      if (Object.prototype.hasOwnProperty.call(dependentPage, 'baseClasses')) {
        dependentPage.baseClasses.forEach(baseClass => {
          if (baseClass.refId) {
            pageNames.push(baseClass.refId)
          }
        })
      }
    }

    let promises = []
    pageNames.forEach(pageName => {
      promises.push(DoxygenService.getPage(pageName))
    })
    return Promise.all(promises).then(pagesReceived => {
      let i = 0
      pagesReceived.forEach(response => {
        const pageName = pageNames[i++]
        const parsedPage = parsePage(pageName, response.data)
        commit('APPEND_PAGE', parsedPage)
      })
    })
  }
}

export const getters = {
  getPageById: state => id => {
    return state.pages.find(page => page.id === id)
  },
  getPageIdForReferenceId: state => reference => {
    const candidatePage = state.pages.find(page =>
      reference.startsWith(page.id)
    )
    if (candidatePage) {
      return candidatePage.id
    }
    return candidatePage
  },
  getPageByName: state => name => {
    return state.pages.find(page => page.name === name)
  },
  getDependeePages: (state, getters) => (id, recursive) => {
    const originalPage = getters.getPageById(id)
    let dependentPages = []
    if (Object.prototype.hasOwnProperty.call(originalPage, 'baseClasses')) {
      originalPage.baseClasses.forEach(baseClass => {
        if (baseClass.refId) {
          const dependentPage = getters.getPageById(baseClass.refId)
          dependentPages.push(dependentPage)
          if (recursive) {
            const dependentDependentPages = getters.getDependeePages(
              dependentPage.id,
              true
            )
            dependentPages = [
              ...new Set([...dependentPages, ...dependentDependentPages])
            ]
          }
        }
      })
    }
    return dependentPages
  }
}
