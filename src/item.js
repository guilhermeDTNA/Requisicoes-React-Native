import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableHighlight, Button} from 'react-native';

export default class Item extends Component{

	constructor(props){
		super(props);
		this.state={
			done:(this.props.data.done=='1') ? styles.done : styles.undone
		};
		this.marcar = this.marcar.bind(this);
		this.excluir = this.excluir.bind(this);
	}

	excluir(){
		fetch(this.props.url+'/'+this.props.data.id, {
			method:'DELETE',
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json'
			}
		})

		.then((r)=>r.json())
		.then((json)=>{
			this.props.loadFunction();
		})

	}

	marcar(){
		let state = this.state;
		let done = 'sim';

		if(state.done == styles.undone){
			state.done = styles.done;
			done = 'sim';
		} else{
			state.done = styles.undone
			done = 'nao';
		}


		fetch(this.props.url+'/'+this.props.data.id, {
			method:'PUT',
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				done:done
			})
		})

		.then((r)=>r.json())
		.then((json)=>{})

		this.setState(state);
	}


render(){
	return(
		<View style={styles.area}>
		<TouchableHighlight style={[styles.marcarArea, this.state.done]} onPress={this.marcar} >
		<View>

		</View>
		</TouchableHighlight>
		<View style={styles.areaNomeBotao} >
		<Text style={styles.nome}>{this.props.data.item}</Text>

		<Button style={styles.botao} title="X" onPress={this.excluir} />
		<Text style={styles.restanteLinha}></Text>
		</View>
		</View>
		);
}
}

const styles = StyleSheet.create({
	area:{
		paddingTop:10,
		paddingBottom:10,
		borderBottomWidth:1,
		borderColor:'#CCCCCC',
		flex:1,
		flexDirection:'row',
		alignItems:'center'
	},
	marcarArea:{
		height:40,
		width:40,
		marginLeft:10,
		marginRight:10
	},
	undone:{
		backgroundColor:'#CCCCCC'

	},
	done:{
		backgroundColor:'green'

	},
	botao:{
		height:40,
		width:40,
		flex: 2,

	},
	nome:{
		flex:2
	},
	areaNomeBotao:{
		flex:1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	restanteLinha:{
		flex:6
	}
});