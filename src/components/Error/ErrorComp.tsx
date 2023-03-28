import React from 'react';
import styles from "./ErrorComp.module.scss";

// Компонент для вывода ошибки
const Error = () => {
  return (
    <div className={styles.error}>Произошла непредвиденная ошибка</div>
  )
}

export default Error