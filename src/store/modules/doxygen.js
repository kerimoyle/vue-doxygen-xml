import DoxygenService from '@/services/DoxygenService'
import { parsePage } from '@/js/doxygenparser'

export const namespaced = true

export const state = {
  pages: [],
  inflight: new Map()
}

export const mutations = {
  APPEND_PAGE(state, page) {
    state.pages.push(page)
  },
  ADD_INFLIGHT(state, payload) {
    state.inflight.set(payload.page_name, payload.pending)
  },
  REMOVE_INFLIGHT(state, id) {
    state.inflight.delete(id)
  }
}

export const actions = {
  fetchPage({ commit, getters }, page_name) {
    if (getters.isInflight(page_name)) {
      return getters.getInflight(page_name)
    }
    const pending = DoxygenService.getPage(page_name)
      .then(response => {
        const page = parsePage(page_name, response.data)
        commit('APPEND_PAGE', page)
        commit('REMOVE_INFLIGHT', page_name)
        return page
      })
      .catch(error => {
        commit('REMOVE_INFLIGHT', page_name)
        throw error
      })
    commit('ADD_INFLIGHT', { page_name, pending })
    return pending
  },
  fetchDependeePages({ dispatch, getters }, pageName) {
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
      promises.push(dispatch('fetchPage', pageName))
    })
    return Promise.all(promises)
  }
}

export const getters = {
  getPageById: state => id => {
    return state.pages.find(page => page.id === id)
  },
  dispalyInflight: state => () => {
    console.log(state.inflight)
  },
  isInflight: state => id => {
    return !!state.inflight.get(id)
  },
  getInflight: state => id => {
    return state.inflight.get(id)
  },
  getPageIdForReferenceId: state => reference => {
    const candidatePage = state.pages.find(page =>
      reference.startsWith(page.id)
    )
    return candidatePage ? candidatePage.id : undefined
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
