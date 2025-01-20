import React from 'react';
import styles from './styles/app-default-layout.module.scss';

interface AppDefaulLayoutProps {
  children?: React.ReactNode;
}

export const AppDefaulLayout: React.FC<AppDefaulLayoutProps> = ({ children }) => {
  return <div className={styles['app-default-layout']}>{children}</div>;
};
