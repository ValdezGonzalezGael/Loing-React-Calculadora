import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import App from './App';
import './index.css';

const cookies = new Cookies();

class Menu extends Component {
  cerrarSesion=()=>{
    cookies.remove('id', {path: "/"});
    cookies.remove('apellido_paterno', {path: "/"});
    cookies.remove('apellido_materno', {path: "/"});
    cookies.remove('nombre', {path: "/"});
    cookies.remove('username', {path: "/"});
      window.location.href='./';
  }

  render() {
      return (
          <div>
              Menu Principal

              <br />
              <button onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
              <App />
          </div>
      );
  }
}

export default Menu;
