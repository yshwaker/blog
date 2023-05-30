import '@code-hike/mdx/dist/index.css'
import splitbee from '@splitbee/web'
import { Lora } from 'next/font/google'
import Link from 'next/link'
import { useEffect } from 'react'

import '../styles/globals.css'

const lora = Lora({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
    })
  })
  return (
    <div className="font-sans max-w-3xl mx-5vw md:mx-auto py-8">
      <h1 className={`${lora.className} text-xl`}>
        <Link href="/" className="text-gray-700 hover:text-black">
          Shio Y. Blog
        </Link>
      </h1>
      <Component {...pageProps} />
      <footer className="mt-28 text-gray-500">
        All rights reserved © Shio Y. 2023
      </footer>
    </div>
  )
}

export default MyApp
