<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import type { Result } from '../interfaces/character'
  import characterStore from '../../store/characters.store'
  import rickAndMortyApi from '@/api/rickAndMortyApi'
  import { useQuery } from '@tanstack/vue-query'

  const route = useRoute()

  const {id} = route.params as {id: string}

  const getCharacterCacheFirst = async(characterId: string):Promise<Result> => {
    console.log('characterId', characterId)
    if (characterStore.checkIdInStore(characterId)) {
      return characterStore.ids.list[characterId]
    }

    const { data } = await rickAndMortyApi.get<Result>(`/character/${characterId}`)
    console.log('data', data)
    return data
  }

  const {data: character} = useQuery(
    ['character', id],
    () => getCharacterCacheFirst(id), {
      onSuccess(character: Result) {
        characterStore.loadedCharacter(character)
      }
    }
  )
</script>

<template>
  <h1 v-if="!character">
    Loading
  </h1>
  <div v-else>
    <h1>{{ character.name }}}</h1>
    <div class="character-container">
      <img
        :src="character.image"
        :alt="character.name"
      >
      <ul>
        <li>Status: {{ character.status }}</li>
        <li>Species: {{ character.species }}</li>
        <li>Origin: {{ character.origin.name }}</li>
        <li>Location: {{ character.location.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.character-container {
  display: flex;
  flex-direction: row;
}
img {
  width: 150px;
  border-radius: 5px;
}
</style>