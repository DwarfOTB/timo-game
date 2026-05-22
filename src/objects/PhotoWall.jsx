import { useState, useEffect } from 'react'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'
import { PHOTOS } from '../data/photos'

const ACCENTS = ['#f4d0c8', '#c8d8f4', '#d0f4d4', '#f4eac8', '#e8c8f4', '#f4f4c8']

function tilt(i) { return ((i * 2.6180339) % 10 - 5) * (Math.PI / 180) }

function gridPos(i) {
  const col = i % 4
  const row = Math.floor(i / 4)
  return { z: -1.35 + col * 0.90, y: 0.85 + row * 0.95 }
}

function Polaroid({ photo, index, onSelect, showCaption }) {
  const [hov, setHov] = useState(false)
  const accent = ACCENTS[index % ACCENTS.length]
  const { z, y } = gridPos(index)

  return (
    <group
      position={[-3.87, y, z]}
      rotation={[0, Math.PI / 2, tilt(index)]}
      onClick={(e) => { e.stopPropagation(); onSelect(index) }}
      onPointerEnter={() => { setHov(true);  document.body.style.cursor = 'pointer' }}
      onPointerLeave={() => { setHov(false); document.body.style.cursor = 'default' }}
    >
      <mesh castShadow>
        <boxGeometry args={[0.04, 0.82, 0.64]} />
        <meshStandardMaterial
          color={hov ? '#f5f0e8' : '#ffffff'}
          roughness={0.7}
          emissive={hov ? '#ffe8d0' : '#000000'}
          emissiveIntensity={hov ? 0.1 : 0}
        />
      </mesh>
      <mesh position={[0, -0.33, 0]}>
        <boxGeometry args={[0.04, 0.14, 0.64]} />
        <meshStandardMaterial color={accent} roughness={0.8} />
      </mesh>
      <Html transform position={[0.022, 0.05, 0]} scale={0.008}>
        <div style={{ width: '70px', height: '70px', overflow: 'hidden', background: '#f0e8e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={photo.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { e.currentTarget.style.display = 'none' }} />
        </div>
        {showCaption && photo.caption && (
          <div style={{ width: '70px', marginTop: '3px', fontSize: '8px', color: '#5c3d2e', textAlign: 'center', fontFamily: 'Caveat, cursive', lineHeight: 1.3 }}>
            {photo.caption}
          </div>
        )}
      </Html>
    </group>
  )
}

export function PhotoWall() {
  const activeModal   = useRoomStore(s => s.activeModal)
  const openModal     = useRoomStore(s => s.openModal)
  const closeModal    = useRoomStore(s => s.closeModal)
  const unlockedItems = useRoomStore(s => s.unlockedItems)

  const showCaptions = unlockedItems.includes('photo-captions')
  const [selected, setSelected] = useState(0)

  const handleSelect = (i) => { setSelected(i); openModal('photo-wall') }
  const prev = () => setSelected(s => (s - 1 + PHOTOS.length) % PHOTOS.length)
  const next = () => setSelected(s => (s + 1) % PHOTOS.length)

  // Keyboard navigation when modal open
  useEffect(() => {
    if (activeModal !== 'photo-wall') return
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeModal])

  return (
    <group>
      {PHOTOS.map((photo, i) => (
        <Polaroid key={photo.id} photo={photo} index={i} onSelect={handleSelect} showCaption={showCaptions} />
      ))}

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'photo-wall'} onClose={closeModal} dark>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Polaroid card */}
            <div style={{
              background: '#ffffff',
              padding: '14px 14px 52px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
              maxWidth: '400px', width: '84vw',
              transform: `rotate(${tilt(selected) * (180 / Math.PI) * 0.35}deg)`,
            }}>
              <div style={{ width: '100%', aspectRatio: '1', background: '#f0e8e0', overflow: 'hidden' }}>
                <img
                  src={PHOTOS[selected].src}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              {showCaptions && PHOTOS[selected].caption && (
                <p style={{
                  marginTop: '14px',
                  fontFamily: 'Caveat, cursive',
                  fontSize: '24px',
                  color: '#3d2b1f',
                  textAlign: 'center',
                  lineHeight: 1.4,
                }}>
                  {PHOTOS[selected].caption}
                </p>
              )}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginTop: '32px' }}>
              <button className="modal-nav" onClick={(e) => { e.stopPropagation(); prev() }}>‹</button>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'system-ui', fontSize: '12px', letterSpacing: '1px' }}>
                {selected + 1} / {PHOTOS.length}
              </span>
              <button className="modal-nav" onClick={(e) => { e.stopPropagation(); next() }}>›</button>
            </div>

            <button onClick={closeModal} className="modal-close-dark" style={{ marginTop: '20px' }}>
              chiudi
            </button>
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
