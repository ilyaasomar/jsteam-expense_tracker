import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import protectedRoutes from './components/protectedRoutes/protectedRoutes';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import AccountForm from './pages/Account/Form';
import AccountTable from './pages/Account/Table';
import GeneralForm from './pages/General/Form';
import GeneralTable from './pages/General/Table';
import TransactionForm from './pages/Transaction/Form';
import TransactionTable from './pages/Transaction/Table';
import UserForm from './pages/User/Form';
import UserTable from './pages/User/Table';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ECommerce />}>
          <Route path="/account/create-account" element={<AccountForm />} />
          <Route path="/account/accounts" element={<AccountTable />} />
          <Route path="/general/create-action" element={<GeneralForm />} />
          <Route path="/general/actions" element={<GeneralTable />} />
          <Route
            path="/transaction/create-transaction"
            element={<TransactionForm />}
          />
          <Route
            path="/transaction/transactions"
            element={<TransactionTable />}
          />
          <Route path="/user/create-user" element={<UserForm />} />
          <Route path="/user/users" element={<UserTable />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
