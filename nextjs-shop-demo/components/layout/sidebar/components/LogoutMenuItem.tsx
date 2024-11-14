'use client';

import { useTransitionRouter } from 'next-transition-router';
import type { FC } from 'react';
import { useContext } from 'react';

import { logOutUser } from '@/app/api';
import { AuthContext } from '@/app/store/providers/AuthContext';
import Profile from '@/components/icons/profile';

/**
 * LogoutMenu Item
 *
 * @returns LogoutMenu Item
 */
const LogoutMenuItem: FC = () => {
  const router = useTransitionRouter();
  const { authenticate, isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return;
  }
  const onLogout = async () => {
    await logOutUser({ marker: 'email' });
    authenticate();
    router.push('/');
  };

  return (
    <li>
      <button
        className={`group mr-auto flex justify-start gap-3 whitespace-nowrap hover:text-orange-500`}
        onClick={onLogout}
      >
        <div className="my-auto aspect-square size-4 shrink-0">
          <Profile />
        </div>
        <div>Logout</div>
      </button>
    </li>
  );
};

export default LogoutMenuItem;
