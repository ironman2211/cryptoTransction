import './App.css'
import { Navbar, Services, Transaction, Welcome ,Footer} from './components'
import {TransactionContextProvider} from './context/TransactionContext'
function App() {

  return (

        <TransactionContextProvider>
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>

        <Navbar />
        <Welcome></Welcome>

      </div>
      <Services></Services>
      <Transaction></Transaction>
      <Footer></Footer>

    </div>
        </TransactionContextProvider>
  )
}

export default App
