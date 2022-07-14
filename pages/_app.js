import Link from 'next/link'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
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
