<script setup lang="js">
import { createApp } from 'vue'
import App from '../App.vue'
import { router } from '../router'

const steps = [
  {
    title: 'Install Electron-vite',
    code: 'npm create @quick-start/electron@latest',
    text: ['Select vue in installation process']
  },
  {
    title: 'Install TailwindCSS',
    code: 'npm install tailwindcss @tailwindcss/vite',
    text: [
      {
        code: '@import "tailwindcss";',
        text: ' in main.css'
      },
      {
        code: "import tailwindcss from '@tailwindcss/vite'",
        text: ' and add tailwind() under plugins in the render section'
      }
    ]
  },
  {
    title: 'Set up Router',
    code: 'npm install vue-router@4',
    text: [
      'Create router.js and add export statement at the end',
      { code: "import { router } from './router'", text: ' in main.js' },
      { code: "createApp(App).use(router).mount('#app')", text: ' in main.js' }
    ]
  }
]
</script>

<template>
  <div class="page">
    <span class="title">Setting up</span>
    <ol class="flex flex-col gap-5 list-decimal">
      <li v-for="step in steps" :key="step.code" class="flex flex-col">
        <span class="font-bold">{{ step.title }}</span>
        <code>{{ step.code }}</code>
        <ol v-if="Array.isArray(step.text)" class="list-decimal list-inside">
          <li v-for="(item, index) in step.text" :key="index">
            <code v-if="item.code">{{ item.code }}</code>
            <span v-if="item.text">{{ item.text }}</span>
            <span v-else>{{ item }}</span>
          </li>
        </ol>
        <p v-else>{{ step.text }}</p>
      </li>
    </ol>
  </div>
</template>

<style scoped></style>
