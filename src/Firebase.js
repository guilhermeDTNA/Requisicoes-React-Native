import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';

import firebase from 'firebase';
import Conexao from './Conexao';

export default class PrimeiroProjeto extends Component{

	constructor(props){
		super(props);
		this.state={
			nome:'Carregando...',
			nomeInput:'',
			idadeInput:'',
		};

		//let firebaseConfig = Conexao.viewDetails().con;

 
  firebase.database().ref("usuarios/1/nome").on('value', (snapshot)=>{
  	let state = this.state;
  	state.nome = snapshot.val();
  	this.setState(state);
  }); //child_change: só relata mudanças no nó especificado; value: em qualquer nó

  /*
	firebase.database().ref("usuarios/1/nome").once('value').then((snapshot)=>{ //O once faz o aplicativo pegar os dados somente na primeira vez
  	let state = this.state;
  	state.nome = snapshot.val();
  	this.setState(state);
  });
  */
  this.inserirUsuario = this.inserirUsuario.bind(this);


  firebase.database().ref('usuarios/2').remove();  //remove sem precisar do child

  firebase.database().ref('usuarios').child('2').child('idade').set(26);
}

inserirUsuario(){
	if(this.state.nomeInput.length>0){
		let usuarios = firebase.database().ref('usuarios');
		let chave = usuarios.push().key;
		

		usuarios.child(chave).set({
			nome:this.state.nomeInput,
			idade:this.state.idadeInput,

		});

		alert("Usuário inserido");
	}
}

render(){

	return (

		<View style={styles.container}>
		<Text>Meu nome é:</Text>
		<Text>{this.state.nome}</Text>

		<Text>Nome do usuário:</Text>
		<TextInput style={styles.input} onChangeText={(nomeInput)=>this.setState({nomeInput})} />

		<Text>Idade</Text>
		<TextInput style={styles.input} onChangeText={({idadeInput})=>this.setState(idadeInput)} />

		<Button title="Inserir usuário" onPress={this.inserirUsuario} />
		</View>

		);
}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		marginTop:20,
		padding:20
	},
	input:{
		height:40,
		borderWidth:1,
		borderColor:'#FF0000'
	}
});