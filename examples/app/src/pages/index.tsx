import React from 'react';
import styles from './index.css';
import Demo from './Demo';
import ButtonBasic from './ButtonBasic';
export default function() {
  return (
    <div className={styles.normal}>
      <Demo />
      <ButtonBasic />
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">Getting Started</a>
        </li>
      </ul>
    </div>
  );
}