import Head from "next/head"
import Link from "next/link"


export default function TopPage() {
    return(
        <>
      <Head>
        <title>Food Koala トップ</title>
      </Head>
      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <h1>美味しい料理をお得に食べられて、フードロスも減らせる!!</h1>
      </div>
      <br/>
      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <p>テキスト詳細</p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2em' }}> 
        <p>画像挿入</p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <button><Link href='/userResistPage'>新規会員登録</Link></button>
      </div>
      </>
    )
  }
  