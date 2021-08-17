import { useState, useEffect } from 'react';
import './background.css';

function Background() {
  // getting current date
  let today = new Date();
  const months = [
    'Janiari',
    'Februari',
    'Mars',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ];
  let month = months[today.getMonth()];
  let date = 'den' + ' ' + today.getDate() + ' ' + month + ' ' + today.getFullYear();

  // getting current time
  let time = '';

  // changing backgrounds according to seasons:
  const [seasonBackground, setSeasonBackground] = useState('main');

  useEffect(() => {
    if (month === 'Mars' || month === 'April' || month === 'Mai') {
      setSeasonBackground('spring');
    } else if (month === 'Juni' || month === 'Juli' || month ==='Augusti') {
      setSeasonBackground("summer");
    } else if (month === 'September' || month === 'Oktober' || month === 'November') {
      setSeasonBackground("autumn");
    } else {
      setSeasonBackground("winter");
    }
  }, [month]);

  // setting links to background photo authors:
  const authors = [
    {
      season: 'winter',
      author: 'Aaron Burden',
      link: 'https://unsplash.com/@aaronburden'
    },
    {
      season: 'spring',
      author: 'Ryan Stone',
      link: 'https://unsplash.com/@rstone_design',
    },
    {
      season: 'summer',
      author: 'TJ Holowaychuk',
      link: 'https://unsplash.com/@tjholowaychuk',
    },
    {
      season: 'autumn',
      author: 'Sora Sagano',
      link: 'https://unsplash.com/@sorasagano',
    },
  ];

  const [authorName, setAuthorName] = useState(null);
  const [authorLink, setAuthorLink] = useState(null);
 
  let authorQueries = authors.filter(o => o.season === seasonBackground);

  useEffect(() => {
    setAuthorName(authorQueries[0]?.author);
    setAuthorLink(authorQueries[0]?.link);
  }, [authorQueries]);
  
  

  return (
    <div className={seasonBackground}>
      <section className="timeDateLanguageContainer">
        <span class="showTime">Test</span>
        <span class="showDAte">{date}</span>
        <button>EN</button>
      </section>
      <section className="photoAuthorInfo">
        <p>Photo by </p>
        <a href={authorLink}>{authorName}</a>
      </section>
    </div>
  );
}

export default Background;
