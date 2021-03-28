import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Using Proxies with Redux Types</strong>
            <p>One of the most common problems that I run into when using Redux is trying to figure out why an action is
              not being captured by a reducer. For someone just getting starting with Redux,
              debugging this issue can be especially overwhelming because of how Redux manages data flow. </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Using Proxies with Redux Types</strong>
            <p>One of the most common problems that I run into when using Redux is trying to figure out why an action is
              not being captured by a reducer. For someone just getting starting with Redux,
              debugging this issue can be especially overwhelming because of how Redux manages data flow. </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Using Proxies with Redux Types</strong>
            <p>One of the most common problems that I run into when using Redux is trying to figure out why an action is
              not being captured by a reducer. For someone just getting starting with Redux,
              debugging this issue can be especially overwhelming because of how Redux manages data flow. </p>
          </a>
        </div>
      </main>
    </>
  );
}
