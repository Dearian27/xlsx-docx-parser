import React from "react";
import styles from "./styles.module.scss";

const Header = () => {
  const isAuth = true;
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Logo</div>
      {isAuth ? (
        <div className={styles.user}>
          <div className={styles.name}>User</div>
          <div className={styles.avatar}></div>
        </div>
      ) : (
        <button className={styles.signUp}>Sign up</button>
      )}
    </header>
  );
};

export default Header;
