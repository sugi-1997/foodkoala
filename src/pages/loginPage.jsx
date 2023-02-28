import Head from "next/head"
import styles from "../styles/loginPage.module.css"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie'
import Logout from "../components/logout";

const url = '/api/login'

export default function Login() {
  
  const router =useRouter()

  const handleSend = (e) => {
    e.preventDefault();
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        // 'Prefer': "return=representation",
        // 'Authorization': `Bearer ${process.env["POSTGREST_API_TOKEN"]}`,
      },
      body: JSON.stringify(loginForm),
    })
    .then((response)=> response.json())
    .then((loginForm) => {
      console.log('success',loginForm);
    })
  
    .catch((error)=>{
      console.error('Error:',error);
    })
  };

  const[loginForm, setLoginForm] =useState({email:'',password:''});
  
  const handleChange = (e) =>{
    setLoginForm((prevState)=>{
      return{
        ...prevState,
        [e.target.name]:e.target.value,

      };
    });
  };

  // エラー解消後展開
  // const login = () => {
  //    Cookies.set('signedIn','true')
  //    router.replace('/')
  // } 

    return (
        <>
        <Head>
          <title>ログイン</title>
        </Head>
          
          <div className={styles.loginPagePosition}>
          <form onSubmit={handleSend}>
           
           <p>以下のフォームに入力してログイン</p>
           
           <div>
           <div className={styles.loginPage}>
            メールアドレス
            </div>
            <input
            name='email'
            type='email'
            onChange = {handleChange}
            placeholder="something@example.com"
            required
            />
            </div>
            
            <div>
            <div className={styles.loginPage}>
            パスワード
            </div>
            <input
            name='password'
            type='password'
            onChange = {handleChange}
            placeholder="半角英数字で8文字以上"
            required
            pattern="^[a-zA-Z0-9]+$"
            />
            </div>
           
           <div>
            <input type="submit" value="ログイン" /*onClick={login}*/ />
            </div>
          
          </form>
          </div>
          </>
          )}
          
          /*ログインボタン押した後、どこへ遷移…？*/