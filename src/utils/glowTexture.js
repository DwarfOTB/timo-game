import * as THREE from 'three'

function makeGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  // Soft edge glow: slight center, peaks toward the edge like a rim light
  g.addColorStop(0,    'rgba(196,48,110,0.06)')
  g.addColorStop(0.38, 'rgba(196,48,110,0.20)')
  g.addColorStop(0.60, 'rgba(196,48,110,0.78)')
  g.addColorStop(0.74, 'rgba(196,48,110,0.95)')
  g.addColorStop(0.85, 'rgba(196,48,110,0.40)')
  g.addColorStop(0.94, 'rgba(196,48,110,0.08)')
  g.addColorStop(1,    'rgba(196,48,110,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(canvas)
}

export const GLOW_TEX = makeGlowTexture()
