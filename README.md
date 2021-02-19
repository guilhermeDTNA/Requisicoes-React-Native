Projeto Expo que manipula requisições com React Native para fins de estudo.

Após instalar o expo e criar o projeto, basta incluir os arquivos no mesmo e executá-lo com o comando 'expo start'.

Será necessário criar um arquivo dentro do diretório src com o nome: "Conexao.js", que deverá conter a variável de conexão com o projeto no Firebase. O arquivo deve seguir essa estrutura:

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

expo install firebase react-navigation react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
expo install react-navigation-stack
