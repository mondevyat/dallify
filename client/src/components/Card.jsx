import React from 'react'

import { download } from '../assets';
import { downloadImage } from '../utils';

import { withNamespaces } from 'react-i18next';

const Card = (props) => {
  const {
    t,
    _id,
    name,
    prompt,
    photo
  } = props;

  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#1b1b1b] m-2 p-4 rounded-md'>
        <p className="text-white text-md overflow-y-auto prompt">{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-[#ffa31a] flex justify-center items-center text-[#1b1b1b] text-xs font-extrabold select-none'>
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className='w-6 h-6 object-contain invert'
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default withNamespaces()(Card)