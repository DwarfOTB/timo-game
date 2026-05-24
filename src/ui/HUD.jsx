import { useRoomStore } from '../store/useRoomStore'
import { SONGS } from '../data/songs'

const FIRST_DATE = new Date('2026-04-13')

export function HUD() {
  const audioPlaying = useRoomStore(s => s.audioPlaying)
  const days = Math.floor((Date.now() - FIRST_DATE) / 86400000)
  const playingSong = SONGS.find(s => s.id === audioPlaying)

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>

      {/* Days pill — bottom left */}
      <div style={{
        position: 'absolute', bottom: 28, left: 28,
        display: 'inline-flex', alignItems: 'center',
        background: 'rgba(22,13,6,0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(245,220,185,0.18)',
        borderRadius: '50px',
        padding: '8px 18px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
      }}>
        <span style={{
          fontFamily: 'Figtree, system-ui, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.3px',
          color: 'rgba(245,220,185,0.80)',
          userSelect: 'none',
        }}>
          {days === 0 ? 'oggi comincia tutto' : (
            <><span style={{ color: '#f472b6', fontWeight: 700 }}>{days}</span><span style={{ color: 'rgba(245,220,185,0.65)' }}>{' giorni insieme'}</span></>
          )}
        </span>
      </div>

      {/* Now-playing pill — bottom right */}
      {playingSong && (
        <div style={{
          position: 'absolute', bottom: 28, right: 28,
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(22,13,6,0.82)',
          border: '1px solid rgba(200,168,122,0.22)',
          borderRadius: '50px',
          padding: '8px 16px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.18)',
        }}>
          <span style={{
            fontSize: '12px',
            color: '#c8a87a',
            animation: 'hud-pulse 1.8s ease-in-out infinite',
            display: 'inline-block',
          }}>♫</span>
          <span style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '15px',
            color: 'rgba(245,237,224,0.82)',
            letterSpacing: '0.3px',
            userSelect: 'none',
          }}>
            {playingSong.title}
          </span>
        </div>
      )}
    </div>
  )
}
