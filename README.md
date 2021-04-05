<h3>Projeto Expo que manipula requisições com React Native para fins de estudo.</h3>

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
Comandos para instalação dos pacotes via expo:

```console

$ sudo npm install

```

Após instalar os pacotes e criar o projeto, basta incluir os arquivos no mesmo e executá-lo com o comando: 

```console

$ expo start

```