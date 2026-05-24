import * as THREE from 'three'

function makeGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0,    'rgba(196,48,110,0.72)')
  g.addColorStop(0.35, 'rgba(196,48,110,0.30)')
  g.addColorStop(0.68, 'rgba(196,48,110,0.08)')
  g.addColorStop(1,    'rgba(196,48,110,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

export const GLOW_TEX = makeGlowTexture()
