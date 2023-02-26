<script setup lang="ts">
  import { ref } from 'vue'
  import rickAndMortyApi from '@/api/breakingBadApi'
  import type { Character, Result } from '@/characters/interfaces/character'

  // const { data } = await rickAndMortyApi.get<Character>('/character')
  // const characters = data.results
  const characters = ref<Result[]>([])

  rickAndMortyApi.get<Character>('/character').then(resp => {
    console.log('resp', {data: resp.data})
    characters.value = resp.data.results
  })
</script>

<template>
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