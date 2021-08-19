import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import routes from './routes';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <main>{routes}</main>
      <Footer />
    </div>
  );
}

export default App;
