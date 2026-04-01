import { zodResolver } from '@hookform/resolvers/zod';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import { ArrowRight, Check } from 'lucide-react';
import type { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/Button';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import '../../styles/auth-form.scss';
import './reg-form.scss';

const RegSchema = z
  .object({
    name: z.string().min(3, 'Ваше имя короче 3-х символов? Вы - Ян?'),
    email: z.email('Введите коректный email').min(1, 'Введите корректный email'),
    password: z.string().min(8, 'Пароль должен быть не короче 8-ми символов!'),
    confirmPassword: z.string(),
    remember: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают!',
    path: ['confirmPassword'],
  });

type RegFormValues = z.infer<typeof RegSchema>;

export interface AuthFormProps {
  onSwitch: MouseEventHandler<HTMLButtonElement>;
  onClose?: Dispatch<SetStateAction<boolean>>;
}

export const RegForm = ({ onSwitch, onClose }: AuthFormProps) => {
  const {
    register, // привязывает поле к форме
    handleSubmit, // обёртка onSubmit с валидацией
    formState: { errors },
    reset, // сброс формы
    trigger,
    control,
  } = useForm<RegFormValues>({
    resolver: zodResolver(RegSchema), // zod как валидатор
    defaultValues: {
      remember: true,
    },
  });

  const onSubmit = (data: RegFormValues) => {
    // data — уже провалидированные данные, типизированные
    console.log(data);
    onClose?.(false);
    reset(); // очистить форму
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form__form-element">
        <label className="form__form-element__label" htmlFor="name">
          Имя
        </label>
        <input
          className="form__form-element__input"
          {...register('name')}
          type="text"
          id="name"
          placeholder="Ваше имя"
        />
        <ErrorMessage message={errors.name?.message} />
      </div>
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
      <div className="form__form-element">
        <label className="form__form-element__label" htmlFor="confirm-password">
          Повторите пароль
        </label>
        <input
          className="form__form-element__input"
          {...register('confirmPassword', {
            onChange: () => trigger('confirmPassword'),
          })}
          type="password"
          id="confirm-password"
          placeholder="Повторите пароль"
        />
        <ErrorMessage message={errors.confirmPassword?.message} />
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
            Зарегистрироваться
            <ArrowRight />
          </div>
        </Button>
        <div className="placeholder acc-text">
          Уже есть аккаунт?{' '}
          <button className="acc-text__button" onClick={onSwitch}>
            Войти
          </button>
        </div>
      </div>
    </form>
  );
};
