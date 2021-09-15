import 'bootstrap/dist/css/bootstrap.min.css';
import StripeContainer from './Stripe/StripeContainer';
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <StripeContainer />
      <ToastContainer/>
    </div>
  );
}

export default App;
