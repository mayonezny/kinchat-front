import { zodResolver } from '@hookform/resolvers/zod';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import { ArrowRight, Check, Eye, EyeOff } from 'lucide-react';
import { useState, type Dispatch, type MouseEventHandler, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/Button';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import '../../styles/auth-form.scss';
import './reg-form.scss';

const RegSchema = z
  .object({
    login: z
      .string()
      .min(5, 'Ваш логин не может быть короче 5-ти символов!')
      .max(30, 'Ваш логин не может быть длиннее 30-ти символов!'),
    name: z
      .string()
      .min(3, 'Ваше имя короче 3-х символов? Вы - Ян?')
      .max(30, 'Ваше имя длиннее 30-ти символов? Вы Uvuvwevwevwe Onyetenyevwe Ugwemuhwem Osas?'),
    surname: z
      .string()
      .min(3, 'Ваша фамилия короче 3-х символов? Вы - Бо?')
      .max(
        30,
        'Ваша фамилия длиннее 30-ти символов? Вы Uvuvwevwevwe Onyetenyevwe Ugwemuhwem Osas?',
      ),
    password: z
      .string()
      .min(8, 'Пароль должен быть не короче 8-ми символов!')
      .max(50, 'Пароль должен быть не длиннее 50-ти символов!'),
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

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const onSubmit = (data: RegFormValues) => {
    // data — уже провалидированные данные, типизированные
    console.log(data);
    onClose?.(false);
    reset(); // очистить форму
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="name-n-errors">
        <div className="name-and-surname">
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
          </div>
          <div className="form__form-element">
            <label className="form__form-element__label" htmlFor="surname">
              Фамилия
            </label>
            <input
              className="form__form-element__input"
              {...register('surname')}
              type="text"
              id="surname"
              placeholder="Ваша фамилия"
            />
          </div>
        </div>
        <div className="errors-block">
          <ErrorMessage message={errors.name?.message} />
          <ErrorMessage message={errors.surname?.message} />
        </div>
      </div>

      <div className="form__form-element">
        <label className="form__form-element__label" htmlFor="login">
          Логин
        </label>
        <input
          className="form__form-element__input"
          {...register('login')}
          type="text"
          id="login"
          placeholder="ivandopulo.kipriansky"
        />
        <ErrorMessage message={errors.login?.message} />
      </div>
      <div className="form__form-element">
        <label className="form__form-element__label" htmlFor="password">
          Пароль
        </label>
        <div className="password-div">
          <input
            className="form__form-element__input"
            {...register('password')}
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            placeholder="Создайте пароль"
          />
          <button
            title={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            type="button"
            className="password-eye"
            onClick={() => setPasswordVisible((prevState) => !prevState)}
          >
            {isPasswordVisible ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <ErrorMessage message={errors.password?.message} />
      </div>
      <div className="form__form-element">
        <label className="form__form-element__label" htmlFor="confirm-password">
          Повторите пароль
        </label>
        <div className="password-div">
          <input
            className="form__form-element__input"
            {...register('confirmPassword', {
              onChange: () => trigger('confirmPassword'),
            })}
            type={isPasswordConfirmVisible ? 'text' : 'password'}
            id="confirm-password"
            placeholder="Повторите пароль"
          />
          <button
            title={isPasswordConfirmVisible ? 'Скрыть пароль' : 'Показать пароль'}
            type="button"
            className="password-eye"
            onClick={() => setPasswordConfirmVisible((prevState) => !prevState)}
          >
            {isPasswordConfirmVisible ? <EyeOff /> : <Eye />}
          </button>
        </div>
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
