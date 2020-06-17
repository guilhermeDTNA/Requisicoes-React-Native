import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Button} from 'react-native';

export default class Lista extends Component{

  static navigationOptions = {
    title: 'Requisições API',
  };

  constructor(props){
    super(props);
    this.state = {
      filmes:[],
      loading:true
    };

    fetch('https://filmespy.herokuapp.com/api/v1/filmes')
    .then((r)=>r.json())
    .then((json)=>{

      let state = this.state;
      state.filmes = json.filmes;
      state.loading = false;
      this.setState(state);
    });
  }

  render(){
    if(this.state.loading){
      return(
        <View style={[styles.container, styles.loading]}>

        <Image source={require('../assets/loading.gif')} />
        <Text style={styles.loadingTxt}>Carregando</Text>

        <View style={styles.botao}>
        <Button title="Ir para a tela de webService" onPress={()=>this.props.navigation.navigate('webService')} />
        </View>
        </View>
        );
    } else {

      return (
        <View style={styles.container}>
        <FlatList
        data={this.state.filmes}
        renderItem={({item})=><Filme data={item} /> }
        keyExtractor={(item, index)=>item.nome}
        />

        <View style={styles.botao}>
        <Button title="Ir para a tela de webService" onPress={()=>this.props.navigation.navigate('webService')} />
        </View>
        </View>
        );
    } 
  }
}

class Filme extends Component{
  render(){
    return(

      <View style={styles.filmeArea}>
      <Image source={{uri:this.props.data.poster.replace('http', 'https')}} style={styles.filmeImagem} />
      <View styles={styles.filmeInfo} >
      <Text style={styles.filmeNome}>{this.props.data.titulo}</Text>
      <Text>{this.props.data.data}</Text>
      </View>
      </View>

      );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  },

  lista:{
    
  },

  botao:{
    
    marginTop: 10
  },

  loading:{
    justifyContent: 'center',
    alignItems: 'center'
  },

  loadingTxt:{
    fontSize: 18,
    fontWeight: 'bold'
  },

  filmeArea:{
    flex: 1,
    flexDirection: 'row'
  },

  filmeImagem:{
    width: 80,
    height: 110,
    margin: 10
  },

  filmeInfo:{
    flex: 1,
    flexDirection: 'column', 
    marginLeft: 10,
    justifyContent: 'center'
  },

  filmeNome:{
    fontSize: 18,
    fontWeight: 'bold'
  }
});