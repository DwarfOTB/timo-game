import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'
import { SONGS } from '../data/songs'
import { InteractiveObject } from './InteractiveObject'

const WALNUT   = '#5c3d2e'
const WALNUT_L = '#7a5344'
const PLATTER  = '#2a1a0e'
const NEEDLE   = '#c8b090'

function SpotifyEmbed({ spotifyId }) {
  if (!spotifyId) return (
    <div style={{ padding: '14px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', fontSize: '13px', color: '#8a7060', textAlign: 'center', marginTop: '8px' }}>
      ID Spotify non disponibile
    </div>
  )
  return (
    <div style={{ marginTop: '10px', borderRadius: '12px', overflow: 'hidden' }}>
      <iframe
        src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&theme=0`}
        width="100%" height="80" frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ display: 'block', borderRadius: '12px' }}
      />
    </div>
  )
}

export function RecordPlayer({ position = [0, 0, 0] }) {
  const platRef       = useRef()
  const activeModal   = useRoomStore(s => s.activeModal)
  const closeModal    = useRoomStore(s => s.closeModal)
  const audioPlaying  = useRoomStore(s => s.audioPlaying)
  const setAudio      = useRoomStore(s => s.setAudio)
  const unlockedItems = useRoomStore(s => s.unlockedItems)
  const [activeSong, setActiveSong] = useState(null)

  useFrame(() => {
    if (!platRef.current) return
    platRef.current.rotation.y += audioPlaying ? 0.018 : 0.004
  })

  const isSongUnlocked = (song) =>
    song.unlocked || (song.unlocksAt && unlockedItems.includes(song.unlocksAt))

  const handleSelect = (song) => {
    if (!isSongUnlocked(song)) return
    if (activeSong?.id === song.id) { setActiveSong(null); setAudio(null) }
    else { setActiveSong(song); setAudio(song.id) }
  }

  const handleClose = () => { setActiveSong(null); setAudio(null); closeModal() }

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

      <InteractiveObject objectId="record-player" name="giradischi" position={[0, 0.44, 0]} float={false} glowScale={0.9}>
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.12, 0.62]} />
          <meshStandardMaterial color={WALNUT} roughness={0.85} />
        </mesh>
        <mesh ref={platRef} position={[-0.14, 0.09, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
          <meshStandardMaterial color={PLATTER} roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh position={[-0.14, 0.115, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.005, 16]} />
          <meshStandardMaterial color="#d94f3d" roughness={0.7} />
        </mesh>
        <mesh position={[0.22, 0.10, -0.10]} rotation={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.28, 0.025, 0.025]} />
          <meshStandardMaterial color={NEEDLE} roughness={0.6} metalness={0.3} />
        </mesh>
        <mesh position={[0.30, 0.10, -0.10]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color={NEEDLE} roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0.30, 0.10, 0.18]}>
          <cylinderGeometry args={[0.035, 0.035, 0.05, 12]} />
          <meshStandardMaterial color="#3d2b1f" roughness={0.7} />
        </mesh>
      </InteractiveObject>

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'record-player'} onClose={handleClose}>
          <div style={{
            background: '#1e1108',
            border: '1px solid rgba(92,61,46,0.6)',
            borderRadius: '20px',
            padding: '28px 24px 24px',
            width: '100%', maxWidth: '480px',
            fontFamily: 'system-ui, sans-serif',
            color: '#f5ede0',
            maxHeight: '85vh', overflowY: 'auto',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#c8a87a', marginBottom: '20px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Giradischi
            </div>

            {SONGS.map(song => {
              const unlocked = isSongUnlocked(song)
              const selected = activeSong?.id === song.id
              return (
                <div key={song.id}>
                  <div
                    className="song-row"
                    style={{
                      display: 'flex', alignItems: 'flex-start',
                      padding: '10px 10px',
                      borderRadius: selected ? '12px 12px 0 0' : '12px',
                      marginBottom: selected ? 0 : '6px',
                      background: selected ? 'rgba(217,79,61,0.20)' : 'rgba(255,255,255,0.04)',
                      cursor: unlocked ? 'pointer' : 'default',
                    }}
                    onClick={() => handleSelect(song)}
                  >
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, marginRight: '12px',
                      background: selected ? '#d94f3d' : unlocked ? 'rgba(255,255,255,0.1)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', color: selected ? '#fff' : '#8a7060',
                      border: unlocked && !selected ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    }}>
                      {unlocked ? (selected ? '■' : '▶') : '🔒'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: unlocked ? '#f5ede0' : '#4a3520' }}>{song.title}</div>
                      <div style={{ fontSize: '12px', color: '#8a7060', marginTop: '2px' }}>{song.artist}</div>
                      {unlocked && song.note && (
                        <div style={{ fontSize: '12px', color: '#c8a87a', fontStyle: 'italic', marginTop: '3px' }}>{song.note}</div>
                      )}
                      {!unlocked && (
                        <div style={{ fontSize: '12px', color: '#4a3520', fontStyle: 'italic', marginTop: '3px' }}>ritorni ancora un po'...</div>
                      )}
                    </div>
                  </div>
                  {selected && (
                    <div style={{ background: 'rgba(217,79,61,0.12)', borderRadius: '0 0 12px 12px', padding: '0 10px 12px', marginBottom: '6px' }}>
                      <SpotifyEmbed spotifyId={song.spotifyId} />
                    </div>
                  )}
                </div>
              )
            })}

            <button onClick={handleClose} className="modal-close-dark" style={{ marginTop: '14px', width: '100%', borderRadius: '10px' }}>
              chiudi
            </button>
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
