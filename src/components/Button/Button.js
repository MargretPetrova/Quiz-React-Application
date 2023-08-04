import React from 'react';
import styles from './Button.module.css'
import { Link } from 'react-router-dom';

function Button({type, name}) {
    return (
        <div className={styles.buttons}>
        <button className={styles.btn} type={type}>
          {name}
        
        </button>
        </div>
    );
}

export default Button;