import firebase from './Conexao';

class SistemaModels{
	sair(){
		firebase.auth().signOut();
	}
}

export default new SistemaModels;