/** Accepts a YouTube URL in any common form, or a bare 11-character ID. */
export function extractYouTubeId(input: string): string | null {
  const value = input.trim()
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value
  const match = value.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  )
  return match ? match[1] : null
}

export const youTubeThumb = (id: string, quality: 'hq' | 'max' = 'hq') =>
  `https://i.ytimg.com/vi/${id}/${quality === 'max' ? 'maxresdefault' : 'hqdefault'}.jpg`
