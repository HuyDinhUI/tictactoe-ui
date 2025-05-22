import styles from './DefaultLayout.module.scss'
import Header from '../Component/Header/Header'
import Footer from '../Component/Footer/Footer'

const DefaultLayout = ({ children }) => {
  
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;