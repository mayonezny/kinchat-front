import { zodResolver } from '@hookform/resolvers/zod';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import { ArrowRight, Check } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/Button';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';

import type { AuthFormProps } from '../../RegForm';

import '../../styles/auth-form.scss';
import './login-form.scss';

const LoginSchema = z.object({
  email: z.email('Введите коректный email').min(1, 'Введите корректный email'),
  password: z.string().min(8, 'Пароль должен быть не короче 8-ми символов!'),
  remember: z.boolean(),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export const LoginForm = ({ onSwitch, onClose }: AuthFormProps) => {
  const {
    register, // привязывает поле к форме
    handleSubmit, // обёртка onSubmit с валидацией
    formState: { errors },
    reset, // сброс формы
    control,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema), // zod как валидатор
    defaultValues: {
      remember: true,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // data — уже провалидированные данные, типизированные
    console.log(data);
    onClose?.(false);
    reset(); // очистить форму
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form__form-element">
        <label className="form__form-element__label" htmlFor="email">
          Email
        </label>
        <input
          className="form__form-element__input"
          {...register('email')}
          type="email"
          id="email"
          placeholder="ivandopulo@mail.ru"
        />
        <ErrorMessage message={errors.email?.message} />
      </div>
      <div className="form__form-element">
        <label className="form__form-element__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="form__form-element__input"
          {...register('password')}
          type="password"
          id="password"
          placeholder="Создайте пароль"
        />
        <ErrorMessage message={errors.password?.message} />
      </div>
      <div className="form__form-element checkbox-field">
        <Controller
          control={control}
          name="remember"
          render={({ field }) => (
            <Checkbox.Root
              className="checkbox"
              id="remember"
              checked={!field.value}
              onCheckedChange={(checked) => field.onChange(!checked)}
            >
              <Checkbox.Indicator className="checkbox__indicator">
                <Check size={24} strokeWidth={3} />
              </Checkbox.Indicator>
            </Checkbox.Root>
          )}
        />
        <Label.Root className="placeholder label-rem" htmlFor="remember">
          Не запоминать меня
        </Label.Root>
      </div>
      <div className="button-acc">
        <Button type="submit" variant="primary">
          <div className="button-child">
            Войти
            <ArrowRight />
          </div>
        </Button>
        <div className="placeholder acc-text">
          Нет аккаунта?{' '}
          <button className="acc-text__button" onClick={onSwitch}>
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  );
};
