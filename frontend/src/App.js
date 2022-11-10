import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/Header';
import StartPage from './Components/StartPage';
import Battle from './Pages/Battle/Battle';
import Gallery from './Pages/Gallery/Gallery';
import StatisticsHamster from './Pages/History-Statistics/StatisticsHamster';
import History from './Pages/History-Statistics/History';
import Play from './Pages/Battle/Play';
import ShowInfo from './Pages/Gallery/ShowInfo';



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
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/Statistics' element={<StatisticsHamster />} />
            <Route path='/history' element={<History />} />
            <Route path='/play' element={<Play />} />
            <Route path='/show' element={<ShowInfo />} />
          </Routes>
        </main>
      </BrowserRouter>
    </section>

  );

}

export default App;