'use client';

import type { FC } from 'react';
import { useContext } from 'react';

import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';

/**
 * ResetPasswordButton
 * @param title
 *
 * @returns ResetPasswordButton
 */
const ResetPasswordButton: FC<{
  title: string;
}> = ({ title }) => {
  const { setComponent } = useContext(OpenDrawerContext);

  return (
    <button
      onClick={() => {
        setComponent('ForgotPasswordForm');
      }}
      type="button"
      className="font-bold text-gray-400 underline hover:text-orange-500"
    >
      {title}
    </button>
  );
};

export default ResetPasswordButton;
