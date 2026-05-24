import { useState, useEffect, useRef } from 'react'
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
      {/* Shadow behind polaroid */}
      {hov && (
        <mesh position={[-0.004, 0, 0]}>
          <boxGeometry args={[0.02, 0.90, 0.72]} />
          <meshStandardMaterial color="#000000" transparent opacity={0.25} depthWrite={false} />
        </mesh>
      )}
      {/* Main polaroid body */}
      <mesh castShadow>
        <boxGeometry args={[0.04, 0.88, 0.70]} />
        <meshStandardMaterial
          color={hov ? '#fffcf8' : '#faf7f2'}
          roughness={0.6}
          emissive="#e8306e"
          emissiveIntensity={hov ? 0.22 : 0.04}
        />
      </mesh>
      {/* Color bottom strip */}
      <mesh position={[0, -0.36, 0]}>
        <boxGeometry args={[0.042, 0.14, 0.70]} />
        <meshStandardMaterial color={accent} roughness={0.8} />
      </mesh>
      {/* Photo area */}
      <Html transform position={[0.022, 0.06, 0]} scale={0.0085}>
        <div style={{
          width: '74px', height: '74px',
          overflow: 'hidden',
          background: '#e8ddd0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '1px',
        }}>
          <img
            src={photo.src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentNode.innerHTML = '<div style="font-size:28px;opacity:0.35">📷</div>'
            }}
          />
        </div>
        {showCaption && photo.caption && (
          <div style={{ width: '74px', marginTop: '4px', fontSize: '8px', color: '#5c3d2e', textAlign: 'center', fontFamily: 'Caveat, cursive', lineHeight: 1.3 }}>
            {photo.caption}
          </div>
        )}
        {hov && (
          <div style={{
            position: 'absolute', bottom: '-18px', left: '50%', transform: 'translateX(-50%)',
            fontSize: '8px', color: '#c4306e', fontFamily: 'Caveat, cursive',
            whiteSpace: 'nowrap', letterSpacing: '0.5px',
          }}>
            apri →
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
  const swipeStart = useRef(null)

  const handleSelect = (i) => { setSelected(i); openModal('photo-wall') }
  const prev = () => setSelected(s => (s - 1 + PHOTOS.length) % PHOTOS.length)
  const next = () => setSelected(s => (s + 1) % PHOTOS.length)

  const onTouchStart = (e) => { swipeStart.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (swipeStart.current === null) return
    const dx = swipeStart.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) dx > 0 ? next() : prev()
    swipeStart.current = null
  }

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
      {/* Cork board frame + backing */}
      <mesh position={[-3.97, 2.35, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.0, 3.8]} />
        <meshStandardMaterial color="#4a2e14" roughness={0.95} />
      </mesh>
      <mesh position={[-3.96, 2.35, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3.70, 3.50]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.98} />
      </mesh>
      {/* "📷 foto" label pinned top-center */}
      <group position={[-3.87, 4.00, -0.10]} rotation={[0, Math.PI / 2, 0]}>
        <Html transform scale={0.015} center>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '18px',
            fontWeight: 700,
            color: '#f5e0c0',
            background: 'rgba(20,10,4,0.72)',
            border: '1px solid rgba(196,48,110,0.45)',
            padding: '3px 16px 3px 12px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
            letterSpacing: '2px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            📷 i nostri ricordi
          </div>
        </Html>
      </group>

      {PHOTOS.map((photo, i) => (
        <Polaroid key={photo.id} photo={photo} index={i} onSelect={handleSelect} showCaption={showCaptions} />
      ))}

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'photo-wall'} onClose={closeModal} dark>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Polaroid card */}
            <div style={{
              background: '#ffffff',
              padding: '14px 14px 52px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
              width: '100%', maxWidth: '380px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginTop: '28px' }}>
              <button className="modal-nav" onClick={(e) => { e.stopPropagation(); prev() }}>‹</button>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', letterSpacing: '1px' }}>
                {selected + 1} / {PHOTOS.length}
              </span>
              <button className="modal-nav" onClick={(e) => { e.stopPropagation(); next() }}>›</button>
            </div>
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
