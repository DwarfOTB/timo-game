import * as THREE from 'three'

function makeGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  // Ring/outline shape: transparent center, bright ring at edge
  g.addColorStop(0,    'rgba(196,48,110,0)')
  g.addColorStop(0.44, 'rgba(196,48,110,0)')
  g.addColorStop(0.60, 'rgba(196,48,110,0.30)')
  g.addColorStop(0.74, 'rgba(196,48,110,1.0)')
  g.addColorStop(0.84, 'rgba(196,48,110,0.55)')
  g.addColorStop(0.93, 'rgba(196,48,110,0.10)')
  g.addColorStop(1,    'rgba(196,48,110,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(canvas)
}

export const GLOW_TEX = makeGlowTexture()
