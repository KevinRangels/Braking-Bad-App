import type { Result } from "@/characters/interfaces/character"
import { reactive } from "vue"

interface Store {
    characters: {
        list: Result[],
        count: number,
        isLoading: boolean,
        hasError: boolean,
        errorMessage: string | null
    },
    // Metodos
    startLoadingCharacters: () => void,
    loadedCharacters: (data: Result[]) => void,
    loadedCharactersFailed: (error: string) => void
}

// Initial State
const characterStore = reactive<Store>({
  characters: {
    count: 0,
    errorMessage: null,
    hasError: false,
    isLoading: true,
    list: [],
  },

  // Methods
  startLoadingCharacters() {
    // console.log('start loading character')
  },
  loadedCharacters(data: Result[]) {
    this.characters.count = data.length
    this.characters = {
      count: data.length,
      isLoading: false,
      list: data,
      errorMessage: null,
      hasError: false
    }
    console.log('loadedCharacters', data)
  },
  loadedCharactersFailed(error: string) {
    console.log('start loading character')
  }
})

characterStore.startLoadingCharacters()

export default characterStore