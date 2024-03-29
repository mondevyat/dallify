import React from 'react';

import { withNamespaces } from 'react-i18next';

const FormField = (props) => {
  const {
    t,
    labelName,
    type,
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe
  } = props;

  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[#d3d3d4]"
        >
          {t(labelName)}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            {t('surprise_me')}
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={t(placeholder)}
        value={value}
        onChange={handleChange}
        required
        className='bg-[#252427] border border-[#808080] text-[#d3d3d4] text-sm rounded-lg focus:ring-[#4649f] focus:border-[#ffa31a] outline-none block w-full p-3'
      />
    </div>
  )
}

export default withNamespaces()(FormField)