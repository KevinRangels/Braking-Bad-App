<script setup lang="ts">
  import rickAndMortyApi from '@/api/breakingBadApi'
  import type { Character } from '@/characters/interfaces/character'

  rickAndMortyApi.get<Character>('/character').then(resp => {
   
    console.log('resp', {data: resp.data})
  })
</script>

<template>
  <ul>
    <li>Hola</li>
    <li>Hola</li>
  </ul>
</template>

<style scoped>

</style>