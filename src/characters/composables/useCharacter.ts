import { computed, ref } from "vue"
import rickAndMortyApi from "@/api/rickAndMortyApi"
import { useQuery } from '@tanstack/vue-query'
import type { Result } from "../interfaces/character"

const characterSet = ref<{ [id: string]: Result }>({})
const hasError = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

const getCharacter = async(id: string):Promise<Result> => {
  if (characterSet.value[id]) {
    return characterSet.value[id]
  }

  try {
    const { data } = await rickAndMortyApi.get<Result>(`/character/${id}`)
    if (data) return data
    throw new Error(`No se encontro un personaje con el ID ${id}`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const loadedCharacter = (character: Result) => {
  hasError.value = false
  errorMessage.value = null
  characterSet.value[character.id] = character
}

const loadedWithError = (error: string) => {
  hasError.value = true
  errorMessage.value = error
}

const useCharacter = (id: string) => {
  
  const { isLoading } = useQuery(
    ['character', id],
    () => getCharacter(id), {
      onSuccess(character: Result) {
        loadedCharacter(character)
        // TODO: Manejar Error
      },
      onError(error: string) {
        loadedWithError(error)
      }
    }
  )

  return {
    // Properties
    isLoading,
    list: characterSet,
    hasError,
    errorMessage,
    //Getters
    character: computed<Result | null>(() => characterSet.value[id])
    // Methods
  }
}

export default useCharacter