<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query'
  import CardList from '@/characters/components/CardList.vue'
  import rickAndMortyApi from '@/api/rickAndMortyApi'
  import type { Character, Result } from '../interfaces/character'

  const props = defineProps<{title: string, visible: boolean}>()

  const getCharacters = async():Promise<Result[]> => {
    const { data } = await rickAndMortyApi.get<Character>('/character')
    const characters:Result[] = data.results
    return characters
  }        

  const {isLoading, isError, data: characters, error} = useQuery(
    ['characters'], 
    getCharacters
    
  )

</script>

<template>
  <h1 v-if="isLoading">
    Loading
  </h1>
  <h1>{{ props.title }}</h1>
  <CardList :characters="characters || []" />
</template>

<style scoped>

</style>