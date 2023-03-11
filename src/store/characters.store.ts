import { reactive } from "vue"
import rickAndMortyApi from "@/api/rickAndMortyApi"
import type { Result } from "@/characters/interfaces/character"
import type { Character } from '../characters/interfaces/character'

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
  async startLoadingCharacters() {
    const { data } = await rickAndMortyApi.get<Character>('/character')
    const characters:Result[] = data.results
    this.loadedCharacters(characters)
  },
  loadedCharacters(data: Result[]) {
   
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
    this.characters = {
      count: 0,
      errorMessage: error,
      hasError: true,
      isLoading: false,
      list: []
    }
  }
})

// Lo Podemos llamar asi como carga inicial de nuestra aplicacion
characterStore.startLoadingCharacters()

export default characterStore