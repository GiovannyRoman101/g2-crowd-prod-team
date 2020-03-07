import firebase from 'firebase'

const FireBaseConfig = () =>{
	const firebaseConfig = {
		apiKey: "AIzaSyDtMUC8FS2RG9oPHOv1kE4RD8rt1b-WXJg",
		authDomain: "g2-voting-website.firebaseapp.com",
		databaseURL: "https://g2-voting-website.firebaseio.com",
		projectId: "g2-voting-website",
		storageBucket: "g2-voting-website.appspot.com",
		messagingSenderId: "161182543303",
		appId: "1:161182543303:web:5a3073f7c2d3e47aedbde2"
	}
	firebase.initializeApp(firebaseConfig);
} 

export default FireBaseConfig