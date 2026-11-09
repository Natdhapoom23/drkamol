export const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)
export const ArrowUpRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M6 14L14 6M7 6h7v7" />
  </svg>
)
export const Play = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
    <path d="M3.5 1.5v11l9-5.5z" />
  </svg>
)
export const Close = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 3l10 10M13 3L3 13" />
  </svg>
)
