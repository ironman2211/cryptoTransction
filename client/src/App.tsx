import './App.css'
import { Navbar, Services, Transaction, Welcome ,Footer} from './components'

function App() {

  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar />
        <Welcome></Welcome>

      </div>
      <Services></Services>
      <Transaction></Transaction>
      <Footer></Footer>

    </div>
  )
}

export default App
