import React, { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (!!data?.length) {
    return data.map((post) => <Card key={post._id} {...post}/>)
  }

  return (
    <h2 className='mt-5 font-bold text-[#ffa31a] text-xl uppercase'>
      {title}
    </h2>
  )
}

const Home = (props) => {
  const { t } = props;
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('https://dallify.onrender.com/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(t(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) => 
          item.name.toLowerCase().includes(searchText.toLowerCase())
          ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase()));
  
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#d3d3d4] text-[32px]">{t('community_showcase')}</h1>
        <p className="mt-2 text-[#d3d3d4] text-[16px] max-w[500px]">{t('browse_through_collection')}</p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="search_posts"
          type="text"
          name="text"
          placeholder="search_posts_placeholder"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ): (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                {t('results_for')}
                <span className="text-[#d3d3d4]">&nbsp;{searchText}</span>
              </h2>
            )}

            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                  <RenderCards 
                    data={searchedResults}
                    title={t("no_results")}
                  />
                ) : (
                  <RenderCards
                    data={allPosts}
                    title={t('no_posts')}
                  />
                )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default withNamespaces()(Home);