'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { userCreated } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { useUserDataMutation } from '@/redux/api/apiSlice';
import { useNavigate } from 'react-router-dom';

interface createSigninForm {
  email: string;
  password: string;
  confirmpassword: string;
}

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [userData, { isLoading, isError }] = useUserDataMutation();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<createSigninForm>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: createSigninForm) => {
    console.log(data);
    dispatch(userCreated({ email: data.email, password: data.password }));
    userData(data);
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

          <input
            {...register('confirmpassword', { required: true })}
            aria-invalid={errors.confirmpassword ? 'true' : 'false'}
            className="btn text-left"
            placeholder="Confirm Password"
          />
          {errors.confirmpassword?.type === 'required' && (
            <p role="alert">Confirm Password is required</p>
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
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? <p>loading</p> : <p>GitHub</p>}
      </Button> */}
    </div>
  );
}
