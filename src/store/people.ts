import { People } from '@/model/model'
import { defineStore } from 'pinia'

export const usePeopleStore = defineStore({
  id: 'people',
  state: () => {
    return {
      people: {} as People,
    }
  },
  actions: {
    updatePeople(people: People) {
      this.people = people;
    }
  }
})
