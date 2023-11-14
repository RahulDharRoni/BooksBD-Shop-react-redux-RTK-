'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hook';
import { userLogin } from '@/redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

interface createLoginForm {
  email: string;
  password: string;
}

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<createLoginForm>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = (data: createLoginForm) => {
    console.log(data);
    dispatch(userLogin({ email: data.email, password: data.password }));
    navigate('/');
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <input
            {...register('email', { required: 'Email Address is required' })}
            aria-invalid={errors.email ? 'true' : 'false'}
            className="btn text-left"
            placeholder="name@example.com"
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
          <input
            {...register('password', { required: true })}
            aria-invalid={errors.password ? 'true' : 'false'}
            className="btn text-left"
            placeholder="your password"
          />
          {errors.password?.type === 'required' && (
            <p role="alert">Password is required</p>
          )}
          <input type="Submit" className="btn btn-info" />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  );
}
