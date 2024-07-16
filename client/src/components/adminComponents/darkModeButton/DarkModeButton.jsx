import { useEcommerceContext } from '../../../context/Context';
import styles from './darkModeButton.module.css';
import './darkModeButton.module.css';
import { useEffect } from 'react';
const DarkModeButton = () => {
  const { darkMode, setDarkMode } = useEcommerceContext();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (darkMode === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <label className=''>
      <div className={styles.toggle_switch}>
        <label className={styles.switch_label}>
          <input
            type='checkbox'
            className={styles.checkbox}
            onChange={() => {
              setDarkMode((prevTheme) =>
                prevTheme === 'light' ? 'dark' : 'light'
              );
            }}
            checked={darkMode !== 'dark' ? true : false}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
    </label>
  );
};

export default DarkModeButton;
