import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react";
import Link from "next/link";


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
      <div >
      <form /*onSubmit={handleSend}*/>
           <div>
           <label>姓:<input
            name='familyName'
            type='text'
            // onChange = {handleChange}
            placeholder = '例:佐藤'
            required
            />
            </label>
            <label>名:<input
            name='lastName'
            type='text'
            // onChange = {handleChange}
            placeholder = '例:太郎'
            required
            />
            </label>
            </div>
            <div>
           <label>姓(カナ):<input
            name='familyNameKana'
            type='text'
            // onChange = {handleChange}
            placeholder = '例:サトウ'
            required
            />
            </label>
            <label>名(カナ):<input
            name='lastNameKana'
            type='text'
            // onChange = {handleChange}
            placeholder = '例:タロウ'
            required
            />
            </label>
            </div>
            <div>
            <label>メールアドレス:
            <input
            name='email'
            type='email'
            // onChange = {handleChange}
            placeholder="example@aaa.co.jp"
            required
            />
            </label>
            </div>  
            <div>
            <label>パスワード:
            <input
            name='password1'
            type='password'
            // onChange = {handleChange}
            placeholder="半角英数字で8文字以上"
            required
            />
            </label>
            <label>:パスワード(確認用)
            <input
            name='password2'
            type='password'
            // onChange = {handleChange}
            placeholder="前述のパスワード"
            required
            />
            </label>
            </div> 
            <button type="submit">登録</button>
            </form>
      </div>
      </>
    )
  }
  