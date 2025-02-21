import { auth } from '../api/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

//firebaseにサインインする
const signInUser = async (email, password) => {
  try {
    // バリデーション
    if (!email || !password) {
      throw new Error('メールアドレスとパスワードを入力してください。');
    }
    //サインイン
    await signInWithEmailAndPassword(auth, email, password);
    console.log('サインイン');
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      throw new Error('パスワードが違います');
    }
    console.error('サインインエラー:', error.code, error.message);
    return error.message;
  }
};

export default signInUser;
