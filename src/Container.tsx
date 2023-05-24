import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProduct from './containers/newProducts/CreateProduct';

interface User {
  role: string;
}

function Container() {
  const [loggedIn, setLogin] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path='*' element={<CreateProduct />}>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}


export default Container;
