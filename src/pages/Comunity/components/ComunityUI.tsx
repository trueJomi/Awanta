import React from 'react'
import Target from './Target'
import { useTranslation } from 'react-i18next'

// interface Perfil {
//   nombre: string
//   descripcion: string
//   link: string
//   imagen: string
// }

interface PropsComunty {
  perfiles: string[]
  name?: string
}

const ComunityUI: React.FC<PropsComunty> = ({ perfiles, name }) => {
  const { t } = useTranslation()

  return (
    <div className='pb-5 mx-5' >
        <div className="text-start mb-4" >
            <div className="italic" >
                {t('tab-5.hi')} {name}!
            </div>
            <div className="font-black text-xl" >
                {t('tab-5.title')}
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
            {perfiles.map((data, idx) => (
                <Target
                    key={idx}
                    link={data}
                />
            ))}
        </div>

    </div>
  )
}

export default ComunityUI
