import React from 'react';
import { render } from 'react-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';

const App = () => {

  const workStartTime = () => moment().set({'minute': 20, 'second': 0}).format('mm:ss');
  const restStartTime = () => moment().set({'minute': 0, 'second': 20}).format('mm:ss');
  const timeZero = () => moment().set({'minute': 0, 'second': 0}).format('mm:ss');


  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(workStartTime);
  const [timer, setTimer] = useState(false);

  let counter;

  const counterStarted = e => {
    e.preventDefault();
    setStatus('work');
    setTime(workStartTime);
    setTimer(true);
  };

  const counterStopped = e => {
    e.preventDefault();
    setTimer(false);
    setTime(timeZero);
    setStatus('off');
  }

  const checkTime = () => {
    if (time.toString() === '00:00' && status === 'work'){
      playBell();
      setStatus('rest');
      setTime(restStartTime);
    }
    else if (time.toString() === '00:00' && status === 'rest'){
      playBell();
      setStatus('work');
      setTime(workStartTime);
    }
  }

  useEffect (() => {
    checkTime();
  }, [time]);


  useEffect (() => {    
    clearInterval(counter);

    const setNewTime = () => {
      if(timer) {
          setTime(newTime => moment(newTime, 'mm:ss').add(-1, 's').format('mm:ss'));
        }       
      }

    counter = setInterval(setNewTime, 1000);
  }, [timer]);

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  const closeApp = () => {
    window.close();
  }

  return (
    <div>
      {(status === 'off') && <div>
        <h1>Protect your eyes</h1>
      <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
      <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>}
      {(status === 'work') && <img src="./images/work.png" />}
      {(status === 'rest') && <img src="./images/rest.png" />}
      {(status !== 'off') && <div className="timer">
        {time}
      </div>}
      {(status === 'off') && <button className="btn" onClick={counterStarted}>Start</button>}
      {(status !== 'off') && <button className="btn" onClick={counterStopped}>Stop</button>}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));