<script setup lang="ts">
  import { ref } from 'vue'
  import rickAndMortyApi from '@/api/rickAndMortyApi'
  import type { Character, Result } from '@/characters/interfaces/character'
  import { useCharacters } from '@/characters/composables/useCharacters'

  // const { data } = await rickAndMortyApi.get<Character>('/character')
  // const characters = data.results

  const {isLoading, charactersm, hasError, errorMessage} = useCharacters()
  
</script>

<template>
  <h1 v-if="isLoading">
    Loading
  </h1>
  <h1 v-if="hasError">
    {{ errorMessage }}
  </h1>
  <ul>
    <li
      v-for="{id, name} of characters"
      :key="id"
    >
      {{ name }}
    </li>
  </ul>
</template>

<style scoped>

</style>