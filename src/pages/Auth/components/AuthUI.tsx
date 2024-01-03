import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { imgFinanzas, pngTitulo } from '../../../contexts/images.context'
import Typed from 'typed.js'
import { useTranslation } from 'react-i18next'
import LanguageButton from '../../../components/LanguageButton.component'

const AuthUI: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const navigate = useNavigate()
  const textChange = React.useRef(null)
  const { t, i18n } = useTranslation()

  React.useEffect(() => {
    const typed = new Typed(textChange.current, {
      strings: [`<span>${t('auth.baner.word-1')}📊</span>^1000\n<br><span class="text-green-500" >${t('auth.baner.word-2')}💰</span>^1000\n<br><span class="text-blue-400" >${t('auth.baner.word-3')}📈</span>`],
      typeSpeed: 50,
      backSpeed: 50,
      cursorChar: '_',
      smartBackspace: false,
      loop: true
    })

    return () => {
      typed.destroy()
    }
  }, [i18n.language])

  return (
        <div
        style={{
          backgroundImage: `url(${imgFinanzas})`
        }}
        className="h-full absolute w-full font-Noto duration-300 bg-cover" >
            <div className="absolute top-5 right-5 p-3 rounded-xl z-20" >
                <LanguageButton/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full xl:grid-cols-3" >
                <div className="w-full grid items-center bg-black bg-opacity-70 lg:bg-opacity-100 pt-12  h-screen text text-main-white">
                    <div className="text-3xl mt-8 text-center w-full font-bold" >
                        <h2><span className="uppercase font-bold font-sans text-main-yellow text-4xl" >{t('auth.title.head-1')}</span> {t('auth.title.head-2')}</h2>
                        <h1 className="uppercase font-black text-main-yellow font-sans text-5xl" >{t('auth.title.head-3')}</h1>
                        <h2 className="text-4xl capitalize" >{t('auth.title.head-4')}</h2>
                    </div>
                    <div className="form-header mx-auto">
                        <div>
                        <img
                            className=" h-24 mx-auto"
                            src="icons/logo.png"
                            alt="logo"/>
                        </div>
                        <div className="my-3 bg-main font-black text-lg text-center uppercase" >
                            {t('auth.welcome')}
                        </div>
                        <div className="col-span-1 font-bold">
                            {children}
                        </div>
                    </div>
                    <div className=" w-full text-main-yellow text-center font-Romance text-6xl" >
                        <h1>{t('auth.title.phrase-1')}</h1>
                        <h1>{t('auth.title.phrase-2')}</h1>
                    </div>
                    <div className="w-full text-center" >
                        <button onClick={() => {
                        // navigate('/conditions')
                        }} className=" bg-main-white lowercase text-gray-800 py-2 px-4 rounded-full font-bold" >
                            {t('auth.terms')}
                        </button>
                    </div>
                </div>
                <div className="w-full relative bg-opacity-100 lg:bg-opacity-70 bg-gray-800  xl:col-span-2 h-screen grid items-center uppercase text-3xl" >
                    <div className=" h-96 sm:h-80 p-10 border-2 border-main-white text-main-white mx-2 max-w-xl sm:mx-auto" >
                        <h1 className="font-black text-main-yellow text-center" >{t('auth.baner.head-1')}</h1>
                        <h1 className="mb-10 text-center" >{t('auth.baner.head-2')}</h1>
                        <div className="w-full" >
                            <div className="mx-auto" >
                                <span className="font-black text-main-yellow font-mono text-3xl" ref={textChange}></span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 w-full" >
                        <div className="text-center w-56 mx-auto" >
                            <span className="text-xs lowercase inline-block">by</span> <img src={pngTitulo} className="w-48 mx-auto" alt="awanta" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
  )
}

export { AuthUI }
