export const state = () => ({
  messages: []
})

export const mutations = {
  setMessages(state, messages) {
    state.messages = messages
  }
}

export const actions = {
  async fetch({ commit }) {
    const messages = await this.$axios.$get('/api/messages')
    commit('setMessages', messages)
  }
}

export const getters = {
  messages: s => s.messages
}
