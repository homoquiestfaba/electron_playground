<script setup>
import { ref, watch } from 'vue'
import { romanize } from 'romans'

const num = ref('')
const out = ref('')

watch(num, (newVal) => {
  // strip out any non-digit characters
  const cleaned = newVal.replace(/\D/g, '')

  // update the input field if it changed
  if (cleaned !== newVal) {
    num.value = cleaned
  }

  if (cleaned === '') {
    out.value = '' // empty input → no output
    return
  }

  let parsed = parseInt(cleaned, 10) >>> 0

  // enforce max 3999
  if (parsed > 3999) {
    parsed = 3999
    num.value = '3999' // also reflect in input
  }

  out.value = !isNaN(parsed) ? romanize(parsed) : ''
})
</script>

<template>
  <div class="page">
    <span class="title">Roman Converter</span>
    <div class="flex flex-col justify-center items-center gap-10">
      <form @submit.prevent>
        <input
          v-model="num"
          type="text"
          inputmode="numeric"
          class="border p-2 mb-4"
          placeholder="Enter number (max 3999)"
        />
      </form>
      <p>{{ out }}</p>
    </div>
  </div>
</template>
