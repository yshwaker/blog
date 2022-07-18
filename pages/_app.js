import splitbee from '@splitbee/web'
import Link from 'next/link'
import { useEffect } from 'react'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
    })
  })
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="text-lg mb-10">
        <Link href="/">
          <a>ShioY&apos;s Blog</a>
        </Link>
      </h1>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
