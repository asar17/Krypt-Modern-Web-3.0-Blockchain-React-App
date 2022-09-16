import {Navbar,Welcome,Footer,Services,Transactions} from './components'
import {TransactionContext} from './context/TransactionsContext';
import {useContext} from 'react';

const  App=()=> {
  const {name}=useContext(TransactionContext)
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
    </div>
  );
}

export default App;
