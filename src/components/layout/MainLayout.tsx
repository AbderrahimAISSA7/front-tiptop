import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import CookieBanner from '../common/CookieBanner'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  )
}

export default MainLayout