import './App.css'
import { Navbar, Services, Transaction, Welcome ,Footer} from './components'
import {TransactionContextProvider} from './context/TransactionContext'
function App() {

  return (

    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <TransactionContextProvider>

        <Navbar />
        <Welcome></Welcome>
        </TransactionContextProvider>

      </div>
      <Services></Services>
      <Transaction></Transaction>
      <Footer></Footer>

    </div>
  )
}

export default App
