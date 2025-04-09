import React from 'react';
import styles from './Landing.module.css'


const Landing = () => {
  return (
    <main className={styles.landing}>
      <h1>Hello, you are on the landing page for visitors.</h1>
      <p>Sign up now, or sign in to see your super secret dashboard!</p>
    </main>
  );
};

export default Landing;
