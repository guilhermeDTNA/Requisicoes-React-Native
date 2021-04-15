<h3>Projeto via React Native CLI que manipula requisições com React Native para fins de estudo.</h3>

Para executar o projeto, será necessário criar um arquivo dentro do diretório /src com o nome: "Conexao.js", que deverá conter a variável de conexão com o projeto no Firebase. O arquivo deve seguir essa estrutura:

----------------------------------------------
import firebase from 'firebase';

let config = {
    apiKey: "Insira aqui a chave",
    authDomain: "Insira aqui o domínio",
    databaseURL: "site do projeto",
    projectId: "projeto-teste-b1856",
    storageBucket: "Insira aqui.appspot.com",
    messagingSenderId: "Insira aqui o ID",
    appId: "Insira aqui"
};

firebase.initializeApp(config);

----------------------------------------------
Para executar o projeto é necessário ter o React Native CLI instalado em sua máquina, para isso, consulte esse tutorial de instalação: <a href="https://docs.rocketseat.dev/ambiente-react-native/android/linuxComandos">https://docs.rocketseat.dev/ambiente-react-native/android/linuxComandos</a>. Após instalado, basta instalar as dependências e pacotes, executando o comando abaixo:

```console

$ sudo npm install --force

```

Após instalar os pacotes e criar o projeto, basta incluir os arquivos no mesmo e executá-lo com os comandos: 

```console

$ react-native start

$ react-native run-android

```