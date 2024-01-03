import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
        <main className="grid min-h-full place-items-center dark:bg-black bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">

          <p className="text-blue-base text-6xl font-extrabold">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">Page not found</h1>
          <p className="mt-6 leading-7 text-gray-600 dark:text-gray-300">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => {
                navigate('/')
              }}
              className="rounded-md bg-main-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Regrese a Awanta
            </button>
          </div>
        </div>
      </main>
  )
}

export default NotFoundPage
