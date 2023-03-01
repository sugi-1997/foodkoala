import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/concept.module.css';
import BreadList, { menu_list, concept } from 'components/bread_list';

export default function TopPage() {
  return (
    <>
      <Head>
        <title>コンセプト</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, concept]} />
      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <h1>
          美味しい料理をお得に食べられて、フードロスも減らせる!!
        </h1>
      </div>
      <br />

      <div className={styles.concept}>
        <div className={styles.conceptPageMessage}>
          <p>
            複素数体であれば、任意のCM-タイプの A
            は、実際、数体である定義体（英語版）(field of
            definition)を持っている。自己準同型環の可能なタイプは、対合（ロサチの対合（英語版）(Rosati
            involution）をもつ環として既に分類されていて、CM-タイプのアーベル多様体の分類を導き出す。楕円曲線と同じような方法でCM-タイプの多様体を構成するには、Cd
            の中の格子 Λ
            から始め、アーベル多様体のリーマンの関係式（英語版）(Riemann
            relations)を考えに入れる必要がある。
            CM-タイプ(CM-type)は、単位元での A の正則接空間上にある
            EndQ(A) の（最大）可換部分環 L
            の作用を記述したものである。単純な種類のスペクトル理論が適応され、L
            が固有ベクトルの基底を通して作用することを示すことができる。言い換えると、L
            は A
            の正則ベクトル場の上の対角行列を通した作用を持っている。L
            自体がある複数の体の積というよりも数体であるという単純な場合には、CM-タイプは
            L の複素埋め込み（英語版）(complex
            embedding)のリストである。複素共役をなすペアとして、2d
            個の複素埋め込みがあり、CM-タイプは各々のペアのから一つを選択する。そのようなCM-タイプの全てが実現されることが知られている。
          </p>
        </div>
        <div>
          <Image
            /*className*/
            src="/これから"
            alt="コンセプトロゴ"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <button>
          <Link href="/userResistPage">新規会員登録</Link>
        </button>
      </div>
      <Footer />
    </>
  );
}
