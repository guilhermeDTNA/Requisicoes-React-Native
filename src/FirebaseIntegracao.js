import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput, FlatList, ScrollView, Image} from 'react-native';
import * as ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'react-native-fetch-blob';

import firebase from './Conexao';
import SistemaModels from './SistemaModels';

//Para a biblioteca RNFetch
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
    // enable this option so that the response data conversion handled automatically
    auto : true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array, 
    // the response body will be considered as binary data and the data will be stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type 
    // contains string `application/octet`.
    binaryContentTypes : [
    'image/',
    'video/',
    'audio/',
    'foo/',
    ]
}).build()

export default class FirebaseIntegracao extends Component{
    constructor(props){
        super(props);

        this.state = {
            formAvatar: null,
            formNome: '',
            formEmail: '',
            formSenha: '',
            lista: []
        }

        this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar(){

    }

    render(){
        return(

            <View style={styles.container}>
            <View style={styles.cadastroArea}>
                <Text>Cadastre um novo usuário</Text>
                <View style={styles.form}>
                    <Image source={this.state.formAvatar} style={styles.formAvatar} />

                    <View style={styles.formInfo}>
                        <TextInput style={styles.input} placeholder="Digite o nome" value={this.state.formNome} onChangeText={(formNome) => this.setState({formNome})} />
                        <TextInput style={styles.input} placeholder="Digite o e-mail" value={this.state.formEmail} onChangeText={(formEmail) => this.setState({formEmail})} />
                        <TextInput style={styles.input} secureTextEntry={true} placeholder="Digite o senha" value={this.state.formSenha} onChangeText={(formSenha) => this.setState({formSenha})} />

                    </View>
                    </View>

                    <Button title="Cadastrar" onPress={this.cadastrar} />
                </View>
            
                <View style={styles.listaArea}>
                    <FlatList 
                    data={this.state.lista}
                    renderItem={(item) => {
                        return(
                            <View style={styles.itemArea}>
                                <Image source={item.avatar} style={styles.itemAvatar} />
                                <View style={styles.itemInfo}>
                                    <Text>{item.nome}</Text>
                                    <Text>{item.email}</Text>
                                </View>
                            </View>
                           );
                    }}
                    />



                </View>

                <Button style={styles.botaoSair} title="Sair" onPress={SistemaModels.sair} />
                
            
            </View>

            )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop:20
    },
    cadastroArea:{
        backgroundColor: '#EEEEEE',
        margin: 10,
        padding: 10,
        height: 240
    },
    form:{
        flex: 1,
        flexDirection: 'row'
    },
    formAvatar:{
        width: 100,
        height: 100,
        backgroundColor: '#CCCCCC'
    },
    formInfo:{
        flex: 1,
        flexDirection: 'column'
    },
    input:{
        height: 40,
        borderWidth: 1,
        borderColor: '#000000',
        margin: 5
    },
    listaArea:{
        flex: 1,
        backgroundColor: '#EEEEEE',
        margin: 10
    },
    itemArea:{
        height: 100,
        flex: 1,
        flexDirection: 'row'
    },
    itemAvatar:{
        width: 80,
        height: 80,
        margin: 10
    },
    itemInfo:{
        flex: 1,
        flexDirection: 'column'
    },



    botaoSair:{
        paddingBottom:0
    },
    
})