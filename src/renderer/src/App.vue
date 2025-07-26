<script setup>
import Versions from './components/Versions.vue'
import Navbar from './components/Navbar.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <Navbar></Navbar>
  <RouterView />
</template>
