<script setup lang="ts">
  import characterStore from '../../store/characters.store'
  import { useQuery } from '@tanstack/vue-query'
  import CardList from '@/characters/components/CardList.vue'
  import rickAndMortyApi from '@/api/rickAndMortyApi'
  import type { Character, Result } from '../interfaces/character'

  const props = defineProps<{title: string, visible: boolean}>()

  const getCharactersCacheFirst = async():Promise<Result[]> => {

    if (characterStore.characters.count > 0) {
      return characterStore.characters.list
    }

    const { data } = await rickAndMortyApi.get<Character>('/character')
    const characters:Result[] = data.results
    return characters
  }        

  useQuery(
    ['characters'], 
    getCharactersCacheFirst, {
      onSuccess(data) {
        characterStore.loadedCharacters(data)
      },
      onError(error) {
        console.log('Error', error)
        characterStore.loadedCharactersFailed('Error')
      }
    }
  )

</script>

<template>
  <h1 v-if="characterStore.characters.isLoading">
    Loading
  </h1>

  <div v-else-if="characterStore.characters.hasError">
    <h1>Error al cargar</h1>
    <p>{{ characterStore.characters.errorMessage }}</p>
  </div>

  <template v-else>
    <h2>{{ props.title }}</h2>
    <CardList :characters="characterStore.characters.list" />
  </template>
</template>

<style scoped>

</style>