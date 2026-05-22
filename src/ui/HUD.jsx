import { useRoomStore } from '../store/useRoomStore'
import { SONGS } from '../data/songs'

const FIRST_DATE = new Date('2025-04-13')

export function HUD() {
  const audioPlaying = useRoomStore(s => s.audioPlaying)
  const days = Math.floor((Date.now() - FIRST_DATE) / 86400000)
  const playingSong = SONGS.find(s => s.id === audioPlaying)

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {/* Days counter — bottom left */}
      <div style={{
        position: 'absolute', bottom: 24, left: 24,
        fontFamily: 'Caveat, cursive',
        fontSize: '15px',
        color: 'rgba(61,43,31,0.45)',
        letterSpacing: '0.5px',
        userSelect: 'none',
      }}>
        {days} giorni insieme
      </div>

      {/* Audio indicator — bottom right, only when playing */}
      {playingSong && (
        <div style={{
          position: 'absolute', bottom: 24, right: 24,
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(26,16,8,0.72)',
          border: '1px solid rgba(200,168,122,0.2)',
          borderRadius: '50px',
          padding: '6px 14px',
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{ fontSize: '10px', color: '#c8a87a', animation: 'pulse 1.5s infinite' }}>♫</span>
          <span style={{ fontFamily: 'Caveat, cursive', fontSize: '13px', color: 'rgba(245,237,224,0.7)' }}>
            {playingSong.title}
          </span>
        </div>
      )}
    </div>
  )
}
