import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import webService from './src/WebService';
import api from './src/ListaFilmes';


const AppNavigator = createStackNavigator ({
  webService:{
    screen:webService
  },
  api:{
    screen:api
  }
},{
  initialRouteName:'api',
  /*'float': aparece no lugar
    'screen': sobe e se encaixa'
    'none': não aparece header
    */

    headerMode: 'screen',

  //true: mostra o nome da tela anerior ao lado da atual
  headerBackTitleVisible:false,
  headerLayoutPreset:'center',

}

);


export default createAppContainer(AppNavigator);