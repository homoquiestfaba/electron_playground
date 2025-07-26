<script setup>
import { ref, nextTick } from 'vue'
import QrcodeVue, { QrcodeSvg } from 'qrcode.vue'

const QRValue = ref('')
const qrCodeRef = ref(null)

async function saveQRCode() {
  await nextTick() // wait for DOM to update

  if (!qrCodeRef.value) {
    alert('QR code component not ready')
    return
  }

  // Try to get the underlying SVG element inside the component
  // It might be on qrCodeRef.value.$el or qrCodeRef.value.$el.querySelector('svg')
  const svgEl =
    qrCodeRef.value.$el?.tagName === 'svg'
      ? qrCodeRef.value.$el
      : qrCodeRef.value.$el?.querySelector('svg')

  if (!svgEl) {
    alert('SVG element not found inside qrcode-svg component')
    console.log('qrCodeRef.value:', qrCodeRef.value)
    return
  }

  const svgContent = svgEl.outerHTML
  console.log('SVG Content succeful grabbed:', svgContent)
  console.log('window.api in renderer:', window.api)

  // Assuming window.api.saveQRCodeSVG is available
  try {
    const result = await window.api.saveQRCodeSVG(svgContent)
    console.log('Result:', result)
    if (result.success) {
      alert(`QR code saved to: ${result.filePath}`)
    } else {
      alert('Save canceled or failed')
    }
  } catch (error) {
    alert('Error saving QR code: ' + error.message)
  }
}
</script>

<template>
  <div class="page">
    <span class="title">QR-Code Generator</span>
    <div class="flex flex-col justify-center items-center gap-10">
      <form @submit.prevent>
        <input v-model="QRValue" type="text" class="border p-2 mb-4" placeholder="Enter text" />
      </form>

      <qrcode-svg ref="qrCodeRef" :value="QRValue" size="300" level="H"></qrcode-svg>

      <button v-if="QRValue" class="bg-gray-900 rounded-lg px-4 py-2" @click="saveQRCode">
        Save QR Code
      </button>
    </div>
  </div>
</template>
