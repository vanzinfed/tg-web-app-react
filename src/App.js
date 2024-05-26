import React, { useState, useEffect } from 'react';

function App() {
  const tg = window.Telegram.WebApp;
  const [counter, setCounter] = useState(0);
  const [tgReady, setTgReady] = useState(false);



  tg.expand();
  tg.onReady(() => {
    // код, который будет выполнен, когда Telegram готов
  });

  useEffect(() => {
    tg.expand();
    tg.onReady(() => {
      setTgReady(true);
    });
  }, []);

  const handleCounterClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      {tgReady && (
        <div>
          <img src="melon.png" alt="melon" onClick={handleCounterClick} />
          <p>Счет: {counter}</p>
        </div>
      )}
    </div>
  );
}

export default App;