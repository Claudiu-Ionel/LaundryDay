import { useState, useEffect } from 'react';
import './background.css';

function Background() {
  // getting current date
  let today = new Date();
  let months = [
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
  let [seasonBackground, setSeasonBackground] = useState('winter');
  function changeBackgrounds() {
    if (month === 'December' || 'Januari' || 'Februari') {
      setSeasonBackground('winter');
    } else if (month === 'Mars' || 'April' || 'Mai') {
      setSeasonBackground('spring');
    } else if (month === 'Juni' || 'Juli' || 'Augusti') {
      setSeasonBackground('summer');
    } else {
      setSeasonBackground('autumn');
    }
  }
  console.log(seasonBackground);

  useEffect(() => {
    changeBackgrounds();
  });

  return (
    <div className="main">
      <section className="timeDateLanguageContainer">
        <span class="showTime">Test</span>
        <span class="showDAte">{date}</span>
        <button>EN</button>
      </section>
      <section className="photoAuthorInfo">
        <p>Photo by </p>
        <a href="m1.tv">ppppp</a>
      </section>
    </div>
  );
}

export default Background;
