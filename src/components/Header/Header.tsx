import React from 'react';
import styles from './Header.module.css'; // Import your CSS module here

interface AppHeaderProps {
  text: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ text }) => {
  return <header className={styles.header}>{text}</header>;
};

export default AppHeader;
