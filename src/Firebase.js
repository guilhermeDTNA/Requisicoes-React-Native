import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput, FlatList, ScrollView} from 'react-native';

import firebase from './Conexao';

import SistemaModels from './SistemaModels';

export default class PrimeiroProjeto extends Component{

	constructor(props){
		super(props);
		this.state={
			nome:'Carregando...',
			nomeInput:'',
			idadeInput:'',
			listaUsuarios: [],
			email: '',
			senha: '',
			uid: '',
			addItemTxt: '',
			lista: ''
		};

		//O ideal é colocar todo o código do firebase em um arquivo separado, chamando só o método dele
		SistemaModels.sair();

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
  this.cadastrar = this.cadastrar.bind(this);
  this.logar = this.logar.bind(this);

  this.add = this.add.bind(this);

  //firebase.auth().signOut();

/*
  firebase.auth().onAuthStateChanged((user)=>{
  	if(user){
  		firebase.database().ref('usuarios').child(user.uid).set({
  			nome:this.state.nome
  		})
  		
  		alert("Usuário criado com sucesso!");
  	} 
  });
  */

  firebase.auth().onAuthStateChanged((user)=>{
  	if(user){

  		let state = this.state;
  		state.uid = user.uid;
  		this.setState(state);

  		firebase.database().ref('usuarios').child(user.uid).once('value')
  		.then((snapshot)=>{
  			let nome = snapshot.val().nome;

  			alert("Seja bem-vindo, "+nome);
  		});

  		firebase.database().ref('todo').child(user.uid).on('value', (snapshot)=>{
  			let state = this.state;
  			state.lista = [];

  			snapshot.forEach((childItem)=>{
  				state.lista.push({
  					titulo:childItem.val().titulo,
  					key: childItem.key
  				});
  			});

  			this.setState(state);
  		});
  		
  		//alert("Usuário criado com sucesso!");
  	} 
  });


  firebase.database().ref('usuarios/2').remove();  //remove sem precisar do child

  firebase.database().ref('usuarios').child('2').child('idade').set(26);

  firebase.database().ref('usuarios').on('value', (snapshot)=>{ //Coloque once para só atualizar uma vez a cada carregamento
  	let state = this.state;
  	state.listaUsuarios = [];

  	snapshot.forEach((childItem)=>{
  		state.listaUsuarios.push({
  			key:childItem.key,
  			nome:childItem.val().nome,
  			idade:childItem.val().idade
  		});
  	});

  	this.setState(state);
  });
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
cadastrar(){
	firebase.auth().createUserWithEmailAndPassword(
		this.state.email, 
		this.state.senha
		).catch((error)=>{

			//alert(error.code);
			if(error.code == 'auth/weak-password'){
				alert("Sua senha deve ter ao menos 6 caracteres");
			} else if(error.code == "auth/email-already-in-use"){
				alert("E-mail já está cadastrado");
			} else if(error.code == "auth/invalid-email"){
				alert("O e-mail digitado é inválido");
			} else{
				alert("Ocorreu um erro");
			}
			//error.code
			//error.message
			//alert(error.code+" - "+error.message);
		});

		alert("Usuário cadastrado");
	}

	logar(){
		firebase.auth().signInWithEmailAndPassword(
			this.state.email, 
			this.state.senha
			).catch((error)=>{
				if(error.code == 'auth/wrong-password'){
					alert("Senha incorreta");
				} else{
					alert("Tente novamente mais tarde!");
				}
			});
		}

		add(){
			if(this.state.uid != '' && this.state.addItemTxt != ''){
				let todo = firebase.database().ref('todo').child(this.state.uid);
				let chave = todo.push().key;

				todo.child(chave).set({
					titulo:this.state.addItemTxt
				});
			}
		}

		render(){

			return (
				<ScrollView>
				<View style={styles.container}>
				<Text>Meu nome é:</Text>
				<Text>{this.state.nome}</Text>

				<Text>Nome do usuário:</Text>
				<TextInput style={styles.input} onChangeText={(nomeInput)=>this.setState({nomeInput})} />

				<Text>Idade</Text>
				<TextInput style={styles.input} onChangeText={({idadeInput})=>this.setState(idadeInput)} />

				<Button title="Inserir usuário" onPress={this.inserirUsuario} />

				<Text>Usuários</Text>

				<FlatList

				data={this.state.listaUsuarios}
				renderItem={({item}) => <Text>{item.nome}, {item.idade} anos.</Text>}
				/>
				<Text></Text>
				<Text></Text>
				<Text></Text>

				<Text>Cadastrar usuário:</Text>

				<Text>Nome:</Text>
				<TextInput onChangeText={(nome)=>this.setState({nome})} style={styles.input} />

				<Text>E-mail:</Text>
				<TextInput onChangeText={(email)=>this.setState({email})} style={styles.input} />

				<Text>Senha:</Text>
				<TextInput secureTextEntry={true} onChangeText={(senha)=>this.setState({senha})} style={styles.input} />

				<Button title="Cadastrar" onPress={this.cadastrar} />

				<Text></Text>
				<Text></Text>
				<Text></Text>

				<Text>Logar:</Text>
				<Text>E-mail:</Text>
				<TextInput onChangeText={(email)=>this.setState({email})} style={styles.input} />

				<Text>Senha:</Text>
				<TextInput secureTextEntry={true} onChangeText={(senha)=>this.setState({senha})} style={styles.input} />

				<Button title="Logar" onPress={this.logar} /> 

				<View style={styles.addArea}>

				<Text>Adicione um item</Text>
				<TextInput value={this.state.addItemTxt} onChangeText={(addItemTxt)=>this.setState({addItemTxt})} style={styles.input} />
				<Button title="Adicionar" onPress={this.add} />
				</View>

				<FlatList data={this.state.lista} renderItem={({item})=> <Text>{item.titulo}</Text>} style={styles.lista} />

				<Button title="Sair" onPress={SistemaModels.sair} />
				</View>
				</ScrollView>
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
		},
		main:{
			flex: 1
		},
		addArea:{
			borderWidth: 1,
			borderColor: '#000000',
			padding: 5
		},
		lista:{
			margin: 30
		}
	});