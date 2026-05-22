import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { useAudio } from '../hooks/useAudio'
import { SONGS } from '../data/songs'
import { InteractiveObject } from './InteractiveObject'

const WALNUT   = '#5c3d2e'
const WALNUT_L = '#7a5344'
const PLATTER  = '#2a1a0e'
const NEEDLE   = '#c8b090'

export function RecordPlayer({ position = [0, 0, 0] }) {
  const platRef      = useRef()
  const activeModal  = useRoomStore(s => s.activeModal)
  const closeModal   = useRoomStore(s => s.closeModal)
  const audioPlaying = useRoomStore(s => s.audioPlaying)
  const setAudio     = useRoomStore(s => s.setAudio)
  const unlockedItems = useRoomStore(s => s.unlockedItems)
  const { playClip, stopAll } = useAudio()
  const [loading, setLoading] = useState(null)

  useFrame(() => {
    if (!platRef.current) return
    if (audioPlaying) platRef.current.rotation.y += 0.018
  })

  const handlePlay = async (song) => {
    if (audioPlaying === song.id) {
      stopAll()
      setAudio(null)
      return
    }
    setLoading(song.id)
    setAudio(song.id)
    await playClip(song.clip)
    setLoading(null)
  }

  const isSongUnlocked = (song) =>
    song.unlocked || (song.unlocksAt && unlockedItems.includes(song.unlocksAt))

  return (
    <group position={position}>
      {/* Small table */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.9, 0.44, 0.68]} />
        <meshStandardMaterial color={WALNUT_L} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.80, 0.04, 0.58]} />
        <meshStandardMaterial color={WALNUT} roughness={0.8} />
      </mesh>

      <InteractiveObject objectId="record-player" position={[0, 0.44, 0]}>
        {/* Body */}
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.12, 0.62]} />
          <meshStandardMaterial color={WALNUT} roughness={0.85} />
        </mesh>
        {/* Platter */}
        <mesh ref={platRef} position={[-0.14, 0.09, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
          <meshStandardMaterial color={PLATTER} roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Platter label */}
        <mesh position={[-0.14, 0.115, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.005, 16]} />
          <meshStandardMaterial color="#d94f3d" roughness={0.7} />
        </mesh>
        {/* Tonearm */}
        <mesh position={[0.22, 0.10, -0.10]} rotation={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.28, 0.025, 0.025]} />
          <meshStandardMaterial color={NEEDLE} roughness={0.6} metalness={0.3} />
        </mesh>
        {/* Tonearm pivot */}
        <mesh position={[0.30, 0.10, -0.10]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color={NEEDLE} roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Speed knob */}
        <mesh position={[0.30, 0.10, 0.18]}>
          <cylinderGeometry args={[0.035, 0.035, 0.05, 12]} />
          <meshStandardMaterial color="#3d2b1f" roughness={0.7} />
        </mesh>
      </InteractiveObject>

      {/* Modal */}
      {activeModal === 'record-player' && (
        <Html fullscreen>
          <div
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(30,20,14,0.88)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 100,
            }}
            onClick={closeModal}
          >
            <div
              style={{
                background: '#2a1a0e',
                border: '1px solid #5c3d2e',
                borderRadius: '18px',
                padding: '32px 28px 28px',
                maxWidth: '420px', width: '92%',
                fontFamily: 'system-ui, sans-serif',
                color: '#f5ede0',
              }}
              onClick={e => e.stopPropagation()}
            >
              <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#c8a87a', marginBottom: '22px', letterSpacing: '1px' }}>
                🎵 Giradischi
              </h2>

              {SONGS.map(song => {
                const unlocked = isSongUnlocked(song)
                const playing  = audioPlaying === song.id
                return (
                  <div
                    key={song.id}
                    style={{
                      display: 'flex', alignItems: 'flex-start',
                      padding: '12px 10px',
                      borderRadius: '10px',
                      marginBottom: '6px',
                      background: playing ? 'rgba(217,79,61,0.18)' : 'rgba(255,255,255,0.04)',
                      cursor: unlocked ? 'pointer' : 'default',
                      transition: 'background 0.2s',
                    }}
                    onClick={() => unlocked && handlePlay(song)}
                  >
                    {/* Play/lock icon */}
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: playing ? '#d94f3d' : unlocked ? 'rgba(255,255,255,0.1)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', flexShrink: 0, marginRight: '12px',
                      color: playing ? '#fff' : '#8a7060',
                      border: unlocked && !playing ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    }}>
                      {loading === song.id ? '…' : unlocked ? (playing ? '■' : '▶') : '🔒'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '15px', fontWeight: 600,
                        color: unlocked ? '#f5ede0' : '#4a3520',
                      }}>
                        {song.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#8a7060', marginTop: '2px' }}>
                        {song.artist}
                      </div>
                      {unlocked && song.note && (
                        <div style={{ fontSize: '12px', color: '#c8a87a', fontStyle: 'italic', marginTop: '4px' }}>
                          {song.note}
                        </div>
                      )}
                      {!unlocked && (
                        <div style={{ fontSize: '12px', color: '#4a3520', fontStyle: 'italic', marginTop: '4px' }}>
                          ritorni ancora un po'...
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              <button onClick={closeModal} style={{
                marginTop: '16px', width: '100%', padding: '10px',
                background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                color: '#8a7060', borderRadius: '8px', cursor: 'pointer',
                fontFamily: 'system-ui', fontSize: '12px',
              }}>
                chiudi
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
