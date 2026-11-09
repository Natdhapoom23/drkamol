import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="wrap page-head" style={{ minHeight: '60vh', justifyContent: 'center' }}>
      <span className="eyebrow">404</span>
      <h1 className="h1">This page could not be found.</h1>
      <p className="lede">ไม่พบหน้าที่คุณต้องการ</p>
      <Link className="btn btn-light" href="/" style={{ alignSelf: 'flex-start' }}>
        Dr. Kamol — Home
      </Link>
    </div>
  )
}
