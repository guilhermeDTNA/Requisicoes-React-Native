import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput, FlatList, ScrollView, Image} from 'react-native';
import * as ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'react-native-fetch-blob';

import firebase from './Conexao';
import SistemaModels from './SistemaModels';
import Usuario from './Usuario';

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
            userUid: 0,
            formPct: '',
            lista: [],
        }

        this.cadastrar = this.cadastrar.bind(this);
        this.carregarFoto = this.carregarFoto.bind(this);
        this.saveAvatar = this.saveAvatar.bind(this);
        this.saveUser = this.saveUser.bind(this);

        firebase.auth().signOut();

        firebase.database().ref('usuarios').on('value', (snapshot) => {
            let state = this.state;
            state.lista = [];
            snapshot.forEach((child) => {
                state.lista.push({
                    key: child.key,
                    nome: child.val().name,
                    email: child.val().email
                });
            });

            this.setState(state);
        })
    }

    saveAvatar(){
        let uri = this.state.formAvatar.uri.replace('file://', '');
        let avatar = firebase.storage().ref().child('usuarios').child(this.state.userUid+'.jpg');
        let mime = 'image/jpeg';

        RNFetchBlob.fs.readFile(uri, 'base64')
        .then((data) => {
            return RNFetchBlob.polyfill.Blob.build(data, {type:mime+';Base64'});
        })
        .then((blob) => {
            avatar.put(blob, {ContentType: mime})
            .on('state_changed', (snapshot) => {
                let pct = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                this.setState({
                    formPct: pct+'%'
                });
            }, (error) => {
                alert(error.code);
            },
            () => {
                this.saveUser();
            });
        });
    }

    saveUser(){
        if(this.state.userUid != 0){
            firebase.database().ref('usuarios').child(this.state.userUid).set({
                name: this.state.formNome,
                email: this.state.formEmail
            });

            this.setState({
                    formAvatar: null,
                    formNome: '',
                    formEmail: '',
                    formSenha: '',
                    formPct: '',
                    userUid: 0
                });

                firebase.auth().signOut();

                alert("Usuário inserido com sucesso!");
        }
    }

    cadastrar(){
        if (this.state.formEmail != '' && 
            this.state.formNome != '' && 
            this.state.formSenha != '' && 
            this.state.formAvatar != null) {

            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    this.setState = {
                        userUid: user.uid
                    }

                    this.saveAvatar();
                }
            })

        firebase.auth().createUserWithEmailAndPassword(
            this.state.formEmail, 
            this.state.formSenha
            ).catch((error) => {
                alert(error.code);
            });
        }
    }

    carregarFoto(){
        ImagePicker.launchImageLibrary(null, (r) => {
            if(r.uri){
                let state = this.state;
                state.formAvatar = {uri:r.uri};
                this.setState(state);
            }
        });
    }

    render(){
        return(

            <View style={styles.container}>
            <View style={styles.cadastroArea}>
            <Text>Cadastre um novo usuário</Text>
            <View style={styles.form}>
            <View style={styles.formInfo}>

            <Image source={this.state.formAvatar} style={styles.formAvatar} />
            <Button title="Carregar" onPress={this.carregarFoto}></Button>
            <Text>{this.state.formPct}</Text>
            </View>
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
            renderItem={({item}) => <Usuario data={item} />}
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

    botaoSair:{
        paddingBottom:0
    }
    
})