import rickAndMortyApi from "@/api/rickAndMortyApi"
import { useQuery } from "@tanstack/vue-query"
import { computed, ref } from "vue"
import type { Result, Character } from "../interfaces/character"

const characters = ref<Result[]>([])
const hasError = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

const getCharacters = async():Promise<Result[]> => {

  if (characters.value.length > 0) {
    return characters.value
  }

  const { data } = await rickAndMortyApi.get<Character>('/character')
  const charactersData:Result[] = data.results
  return charactersData
}   

const loadedCharacters = (data: Result[]) => {
  characters.value = data
  hasError.value = false
  errorMessage.value = null

}

const useCharacters = () => {
  const {isLoading} = useQuery(
    ['characters'], 
    getCharacters, {
      onSuccess(data) {
        loadedCharacters(data)
      },
      onError(error) {
        console.log('Error', error)
      }
    }
  )
    
  return {
    // Properties
    characters,
    isLoading,
    hasError,
    errorMessage,
    //Getters
    count: computed(() => characters.value.length)
    // Methods
  }}

export default useCharacters