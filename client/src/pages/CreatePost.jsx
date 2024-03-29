import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

import { withNamespaces } from 'react-i18next';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = (props) => {
  const { t } = props;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const [randomPlaceholder, setRandomPlaceholder] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('https://dallify.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })

        await response.json();
        navigate('/');
      } catch (error) {
        alert(t(error));
      } finally {
        setLoading(false);
      }
    } else {
      alert(t('form_check'));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://dallify.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt })
        })

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`});
      } catch (error) {
        alert(t(error));
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert(t('enter_prompt'))
    }
  };

  useEffect(() => {
    const randomPrompt = getRandomPrompt();
    setRandomPlaceholder(randomPrompt);
  }, [])

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#d3d3d4] text-[32px]">{t('create')}</h1>
        <p className="mt-2 text-[#d3d3d4] text-[16px] max-w[500px]">{t('create_image')}</p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="your_name"
            type="text"
            name="name"
            placeholder="Giga Chad"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="prompt"
            type="text"
            name="prompt"
            placeholder={randomPlaceholder}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-[#292929] border border-[#808080] text-gray-900 text-sm rounded-lg focus:ring-[#ffa31a] focus:border-[#ffa31a] w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img 
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="invert w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        
        <div className='mt-5 flex gap-5'>
            <button
              type="button"
              onClick={generateImage}
              className="text-[#1b1b1b] bg-[#ffa31a] font-bold rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImg ? t('generating') : t('generate')}
            </button>
        </div>

        <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>{t('you_can_share_with_others')}</p>
            <button
              type="submit"
              className='mt-3 text-[#ffa31a] bg-black font-bold rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {loading ? t('sharing') : t('share_with_community')}
            </button>
        </div>
      </form>
    </section>
  )
}

export default withNamespaces()(CreatePost)