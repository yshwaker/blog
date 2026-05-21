/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

import '../app.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Shio Y. Blog' },
      { name: 'description', content: 'Personal blog of Shio Y.' },
    ],
    links: [{ rel: 'icon', href: '/favicon.ico' }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <div className="font-sans max-w-3xl mx-5vw md:mx-auto py-8">
        <h1 className="font-lora text-xl">
          <Link to="/" className="text-gray-700 hover:text-black">
            Shio Y. Blog
          </Link>
        </h1>

        <Outlet />

        <footer className="mt-28 text-gray-500">
          All rights reserved © Shio Y. 2025
        </footer>
      </div>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <main className="py-20">
      <h2 className="text-4xl md:text-5xl font-bold">Not found</h2>
      <p className="mt-6 text-gray-600">The page you requested does not exist.</p>
    </main>
  )
}
