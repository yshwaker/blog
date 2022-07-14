import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
