import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Greedy Pig</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1 className={styles.title}>Greedy Pig</h1>
      
      <a className={styles.button} href="/game">Play</a>
      <a className={styles.button} href="/info">Info</a>
    </div>
  )
}

export default Home
