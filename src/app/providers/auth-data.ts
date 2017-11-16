import { Injectable  } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
//import firebase from 'firebase';
import {firebaseconfig} from '../firebase/firebaseconfig';
import {AngularFireModule} from 'angularfire2';

@Injectable()
export class AuthData {

    fireAuth: any;
    userToken: any;

    constructor (public afAuth: AngularFireAuth) {

    }

  
    loginUser (newEmail: string, newPassword: string): Promise<any> {

        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
 
    }

    resetPassword (email: string): Promise<any> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    logoutUser(): Promise<any> {
        this.userToken = {};
        return this.afAuth.auth.signOut();
    }
 
}
