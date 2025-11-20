declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const GA_ID = import.meta.env.VITE_GA_ID
let isInitialized = false

export const initAnalytics = () => {
  if (isInitialized || typeof window === 'undefined' || !GA_ID) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })

  isInitialized = true
}

export const trackPageView = (path: string) => {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

export const trackEvent = (event: string, params?: Record<string, unknown>) => {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }
  window.gtag('event', event, params)
}
