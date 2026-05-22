let audioCtx     = null
let currentSource = null
const bufferCache = new Map()

export function useAudio() {
  const playClip = async (url) => {
    try {
      if (!audioCtx) audioCtx = new AudioContext()
      if (audioCtx.state === 'suspended') await audioCtx.resume()

      if (currentSource) {
        try { currentSource.stop() } catch {}
        currentSource = null
      }

      if (!bufferCache.has(url)) {
        const resp   = await fetch(url)
        const buffer = await resp.arrayBuffer()
        bufferCache.set(url, await audioCtx.decodeAudioData(buffer))
      }

      currentSource         = audioCtx.createBufferSource()
      currentSource.buffer  = bufferCache.get(url)
      currentSource.connect(audioCtx.destination)
      currentSource.start()
      currentSource.onended = () => { currentSource = null }
    } catch (err) {
      console.warn('[useAudio] playClip failed:', err)
    }
  }

  const stopAll = () => {
    try { if (currentSource) currentSource.stop() } catch {}
    currentSource = null
  }

  return { playClip, stopAll }
}
