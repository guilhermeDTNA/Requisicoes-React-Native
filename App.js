import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import webService from './src/WebService';
import api from './src/ListaFilmes';
import firebase from './src/Firebase';
import FirebaseIntegracao from './src/FirebaseIntegracao';


const AppNavigator = createStackNavigator ({
  webService:{
    screen:webService
  },
  api:{
    screen:api
  },
  Firebase:{
    screen:firebase
  },
  FirebaseIntegracao:{
    screen:FirebaseIntegracao
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