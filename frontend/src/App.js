import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/Header';
import StartPage from './Components/StartPage';
import Battle from './Pages/Battle/Battle';
import Gallery from './Pages/Gallery/Gallery';

import History from './Pages/History-Statistics/History';
import Play from './Pages/Battle/Play';
import ShowInfo from './Pages/Gallery/ShowInfo';
import Footer from './Components/Footer';
import Statistics from './Pages/History-Statistics/Statistics';
// import RandomSong from './Pages/RandomSong/RandomSong';


function App() {
  return (

    <section className="App">
      <BrowserRouter>
        <header className="App-header">
          <nav>
            <Header />
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<StartPage />} />
            <Route path='/battle' element={<Battle />} />
            {/* <Route path='/randomsong' element={<RandomSong />} /> */}
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/Statistics' element={<Statistics />} />
            <Route path='/history' element={<History />} />
            <Route path='/play' element={<Play />} />
            <Route path='/show' element={<ShowInfo />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </section>

  );

}

export default App;