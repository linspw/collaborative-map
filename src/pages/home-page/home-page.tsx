import { AppDefaulLayout } from '@layouts';
import styles from './styles/home-page.module.scss';
import { SignInCard } from '@components/sign-in-card';

export const HomePage = () => {
  const renderVideoSection = () => {
    return (
      <video className={styles['home-page__background']} autoPlay muted loop playsInline>
        <source src="/initial_video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    );
  };
  return (
    <AppDefaulLayout>
      {renderVideoSection()}

      <SignInCard />
    </AppDefaulLayout>
  );
};
