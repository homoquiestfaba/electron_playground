<script setup>
import { ref, nextTick } from 'vue'
import QrcodeVue, { QrcodeSvg } from 'qrcode.vue'

const QRValue = ref('')
const qrCodeRef = ref(null)

async function saveQRCode() {
  await nextTick()

  if (!qrCodeRef.value) {
    alert('QR code component not ready')
    return
  }

  const svgEl =
    qrCodeRef.value.$el?.tagName === 'svg'
      ? qrCodeRef.value.$el
      : qrCodeRef.value.$el?.querySelector('svg')

  if (!svgEl) {
    alert('SVG element not found')
    return
  }

  const svgContent = svgEl.outerHTML

  // 🔀 Branch: app vs browser
  if (window.api?.saveQRCodeSVG) {
    try {
      const result = await window.api.saveQRCodeSVG(svgContent)
      if (result.success) {
        alert(`QR code saved to: ${result.filePath}`)
      } else {
        alert('Save canceled or failed')
      }
    } catch (error) {
      alert('Error saving QR code: ' + error.message)
    }
  } else {
    // Browser fallback: trigger download
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.svg'
    a.click()

    URL.revokeObjectURL(url)
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

      <button v-if="QRValue" class="bg-gray-900 rounded-lg px-4 py-2 text-white" @click="saveQRCode">
        Save QR Code
      </button>
    </div>
  </div>
</template>
