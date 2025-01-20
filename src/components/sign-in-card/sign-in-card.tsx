import styles from './styles/sign-in-card.module.scss';
import clsx from 'clsx';
import { Button, Card, TextField } from '@mui/material';
import { useSessionStore } from '@stores/use-user-store';
import { userSchema } from '@utils/validation-schemas';
import { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEnhancedForm } from '@hooks/use-enhanced-form';
import { useNavigate } from 'react-router';

type FormData = z.infer<typeof userSchema>;

export const SignInCard = () => {
  const { setCurrentUser } = useSessionStore();
  const { register, handleSubmit } = useEnhancedForm<FormData>({
    resolver: zodResolver(userSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (user) => {
    setCurrentUser(user);
    navigate('/map');
  };
  return (
    <Card className={clsx(styles['home-page-sign-in-card'])}>
      <form className={clsx(styles['home-page-sign-in-card__form'])} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['home-page-sign-in-card__title']}>Welcome to the GeoMap</div>

        <TextField label="Name" variant="outlined" size="small" required {...register('name')} />

        <Button variant="contained" type="submit">
          Entrar
        </Button>
      </form>
    </Card>
  );
};
