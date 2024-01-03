import React from 'react'

const Target: React.FC<{ link: string }> = ({ link }) => {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const iframe = iframeRef.current
    const handleLoad = () => {
      setLoading(false)
    }
    if (iframe !== null) {
      iframe.addEventListener('load', handleLoad)
      return () => {
        iframe.removeEventListener('load', handleLoad)
      }
    }
  }, [])

  return (
    <div className="col-span-1 " >
        <div
        className={`border-2 rounded-3xl mx-5 my-3 hover:scale-105 hover:border-transparent duration-500 bg-gray-500 ${loading && 'animate-pulse'}`} >
          <iframe ref={iframeRef} className="rounded-3xl h-72 w-full hover:scale-105 duration-300" src={`${link}embed`}></iframe>
        </div>
    </div>
  )
}

export default Target
