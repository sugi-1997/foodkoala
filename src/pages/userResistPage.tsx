import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react";
import Link from "next/link";
import  Header  from "../components/header";
import Footer from "../components/footer"
import styles from "../styles/userRegistItem.module.css"


// const url ='これから確認しまっせ'


export default function UserRegist() {
    // const router = useRouter()
    // const handleSend = (e:any) =>{
    //     e.preventDefault();
    //     fetch(url,{
    //         method: 'POST',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         body: JSON.stringify(form),
    //     })
    //      .then((response) => response.json())
    //      .then((form) => {
    //         console.log('Success', form);
    //      })
    //      .catch((error) => {
    //         console.error('Error:',error);
    //      });
    //      router.push('登録したあと遷移する場所')

    // };

    // const [form, setForm] = useState({ 
    //     familyName:'',
    //     lastName:'',
    //     familyNameKana:'',
    //     lastNameKana:'',
    //     email:'',
    //     password1:'',
    //     password2:'',
    // });

    // const handleChange = (e) =>{
    //     setForm((prevState) => {
    //         return{
    //             ...prevState,
    //             [e.target.name]: e.target.value,
    //         };
    //     });
    // };

    return(
        <>
      <Head>
        <title>新規会員登録</title>
      </Head>
      <Header/>
      
      <div className={styles.userRegistPosition}>
      <h3>会員情報登録</h3>
      <form /*onSubmit={handleSend}*/>
           
           <div>
           <div className={styles.userRegistItem}>
           お名前(漢字)
           </div>

           <input
            name='familyName'
            type='text'
            // onChange = {handleChange}
            placeholder = '例:佐藤 太郎'
            required
            
            />
          </div>
          
          <div>
          <div className={styles.userRegistItem}>
           名前（ふりがな)
           </div>
           <input
            name='familyNameKana'
            type='text'
            // onChange = {handleChange}
            placeholder = '例:さとう たろう'
            required
            />
           </div>

           <div>
           <div className={styles.userRegistItem}>
            メールアドレス
            </div>
            <input
            name='email'
            type='email'
            // onChange = {handleChange}
            placeholder="example@example.com"
            required
            />
            </div>
            
            <div>
            <div className={styles.userRegistItem}>
            パスワード
            </div>
            <input
            name='password1'
            type='password'
            // onChange = {handleChange}
            placeholder="半角英数字で8文字以上"
            required
            pattern="^[a-zA-Z0-9]+$"
            />
            </div>
      
            <div>
            <div className={styles.userRegistItem}>
            パスワード(確認用)
            </div>
            <input
            name='password2'
            type='password'
            // onChange = {handleChange}
            placeholder="前述のパスワード"
            required
            pattern="^[a-zA-Z0-9]+$"
            />
            </div>

            <br/>
            <button type="submit">登録</button>
            </form>
            </div>
            <Footer/>
      </>
    )
  }
  