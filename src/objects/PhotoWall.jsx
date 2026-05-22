import { useState, useMemo } from 'react'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { PHOTOS } from '../data/photos'

// Pastel accent colours cycling per polaroid
const ACCENTS = ['#f4d0c8', '#c8d8f4', '#d0f4d4', '#f4eac8', '#e8c8f4', '#f4f4c8']

// Seed-stable random ±5° tilt per polaroid
function tilt(i) { return ((i * 2.6180339) % 10 - 5) * (Math.PI / 180) }

// 4×4 grid positions on left wall (x = const, vary y & z)
function gridPos(i) {
  const col = i % 4
  const row = Math.floor(i / 4)
  return {
    z: -1.35 + col * 0.90,
    y:  0.85 + row * 0.95,
  }
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
      {/* White frame */}
      <mesh castShadow>
        <boxGeometry args={[0.04, 0.82, 0.64]} />
        <meshStandardMaterial
          color={hov ? '#f5f0e8' : '#ffffff'}
          roughness={0.7}
          emissive={hov ? '#ffe8d0' : '#000000'}
          emissiveIntensity={hov ? 0.08 : 0}
        />
      </mesh>
      {/* Accent strip (bottom) */}
      <mesh position={[0, -0.33, 0]}>
        <boxGeometry args={[0.04, 0.14, 0.64]} />
        <meshStandardMaterial color={accent} roughness={0.8} />
      </mesh>
      {/* Photo thumbnail via Html */}
      <Html transform position={[0.022, 0.05, 0]} scale={0.008}>
        <div style={{
          width: '70px', height: '70px', overflow: 'hidden',
          background: '#f0e8e0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px',
        }}>
          <img
            src={photo.src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        {showCaption && photo.caption && (
          <div style={{
            width: '70px', marginTop: '2px', fontSize: '7px', color: '#5c3d2e',
            textAlign: 'center', fontFamily: 'Caveat, cursive', lineHeight: 1.2,
          }}>
            {photo.caption}
          </div>
        )}
      </Html>
    </group>
  )
}

export function PhotoWall({ position = [0, 0, 0] }) {
  const activeModal    = useRoomStore(s => s.activeModal)
  const openModal      = useRoomStore(s => s.openModal)
  const closeModal     = useRoomStore(s => s.closeModal)
  const unlockedItems  = useRoomStore(s => s.unlockedItems)

  const showCaptions = unlockedItems.includes('photo-captions')
  const [selected, setSelected]   = useState(0)

  const handleSelect = (i) => { setSelected(i); openModal('photo-wall') }
  const prev = () => setSelected(s => (s - 1 + PHOTOS.length) % PHOTOS.length)
  const next = () => setSelected(s => (s + 1) % PHOTOS.length)

  return (
    <group position={position}>
      {PHOTOS.map((photo, i) => (
        <Polaroid
          key={photo.id}
          photo={photo}
          index={i}
          onSelect={handleSelect}
          showCaption={showCaptions}
        />
      ))}

      {/* Full-screen photo modal */}
      {activeModal === 'photo-wall' && (
        <Html fullscreen>
          <div
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(30,20,14,0.92)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              zIndex: 100,
            }}
            onClick={closeModal}
          >
            <div
              style={{
                background: '#ffffff',
                padding: '12px 12px 48px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                maxWidth: '440px', width: '88%',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                transform: `rotate(${tilt(selected) * (180 / Math.PI) * 0.4}deg)`,
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ width: '100%', aspectRatio: '1', background: '#f0e8e0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                <img
                  src={PHOTOS[selected].src}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.currentTarget.style.display='none' }}
                />
              </div>
              {showCaptions && PHOTOS[selected].caption && (
                <p style={{
                  marginTop: '12px',
                  fontFamily: 'Caveat, cursive',
                  fontSize: '22px',
                  color: '#3d2b1f',
                  textAlign: 'center',
                }}>
                  {PHOTOS[selected].caption}
                </p>
              )}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '28px' }}>
              <button onClick={(e) => { e.stopPropagation(); prev() }} style={navBtn}>‹</button>
              <span style={{ color: '#8a7060', fontFamily: 'system-ui', fontSize: '13px', alignSelf: 'center' }}>
                {selected + 1} / {PHOTOS.length}
              </span>
              <button onClick={(e) => { e.stopPropagation(); next() }} style={navBtn}>›</button>
            </div>

            <button onClick={closeModal} style={closeBtn}>chiudi</button>
          </div>
        </Html>
      )}
    </group>
  )
}

const navBtn = {
  width: '44px', height: '44px', borderRadius: '50%',
  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
  color: '#ffffff', fontSize: '24px', cursor: 'pointer', fontFamily: 'system-ui',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
const closeBtn = {
  marginTop: '20px', padding: '9px 28px',
  background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
  color: 'rgba(255,255,255,0.7)', borderRadius: '50px',
  fontSize: '12px', cursor: 'pointer', fontFamily: 'system-ui',
}
