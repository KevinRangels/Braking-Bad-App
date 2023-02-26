<script setup lang="ts">
  import { ref } from 'vue'
  import { useQuery} from '@tanstack/vue-query'
  import rickAndMortyApi from '@/api/rickAndMortyApi'
  import type { Character, Result } from '@/characters/interfaces/character'
  import { useCharacters } from '@/characters/composables/useCharacters'

  // 1-Normal Suspense
  // const { data } = await rickAndMortyApi.get<Character>('/character')
  // const characters = data.results


  // 2- Composable Functions
  // const {isLoading, characters, hasError, errorMessage} = useCharacters()

  // 3- TanStack query
  const getCharactersSlow = async():Promise<Result[]> => new Promise((resolve) => {
    setTimeout(async() => {
      const {data} = await rickAndMortyApi.get<Character>('/character')
      const characters:Result[] = data.results
      resolve(characters)
      // return characters
        
    }, 3000)
  })

  const {isLoading, isError, data: characters, error} = useQuery(['characters'], getCharactersSlow, {
    cacheTime: 1000 * 60,
    refetchOnReconnect: 'always'
  })
  
</script>

<template>
  <h1 v-if="isLoading">
    Loading
  </h1>
  <div>
    <li
      v-for="{id, name} of characters"
      :key="id"
    >
      {{ name }}
    </li>
  </div>
</template>

<style scoped>

</style>