import { useEffect } from 'react';
import './App.css';




function App() {
  const {user, onClose} = useTelegram();


useEffect(()=>{
tg.ready();
},[])



  return (
    <div className="App">
Скоро будут сочные дыньки. Не забывай про нас.
    </div>
  );
}

export default App;
