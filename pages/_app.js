import splitbee from '@splitbee/web'
import Link from 'next/link'
import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
    })
  })
  return (
    <div className="mx-[10vw] py-8 font-text">
      <h1 className="font-header text-xl">
        <Link href="/">
          <a>Shio Y. Blog</a>
        </Link>
      </h1>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
