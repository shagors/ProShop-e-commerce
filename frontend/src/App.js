import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
function App() {
  return (
    <>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen></HomeScreen>}></Route>
            <Route path='/login' element={<LoginScreen></LoginScreen>}></Route>
            <Route path='/register' element={<RegisterScreen></RegisterScreen>}></Route>
            <Route path='/product/:id' element={<ProductScreen></ProductScreen>}></Route>
            <Route path='/cart/:id' element={<CartScreen></CartScreen>}></Route>
          </Routes>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;