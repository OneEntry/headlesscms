const ProfileIcon = (props?: { active?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        'size-full group-hover:fill-orange-500 transition-colors duration-300 ' +
        (props?.active ? 'fill-orange-500' : 'fill-slate-700')
      }
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3636 8.72727C16.3636 9.88458 15.9039 10.9945 15.0856 11.8128C14.2672 12.6312 13.1573 13.0909 12 13.0909C10.8427 13.0909 9.73278 12.6312 8.91444 11.8128C8.0961 10.9945 7.63636 9.88458 7.63636 8.72727C7.63636 7.56996 8.0961 6.46006 8.91444 5.64172C9.73278 4.82338 10.8427 4.36364 12 4.36364C13.1573 4.36364 14.2672 4.82338 15.0856 5.64172C15.9039 6.46006 16.3636 7.56996 16.3636 8.72727ZM14.1818 8.72727C14.1818 9.30593 13.9519 9.86088 13.5428 10.2701C13.1336 10.6792 12.5787 10.9091 12 10.9091C11.4213 10.9091 10.8664 10.6792 10.4572 10.2701C10.0481 9.86088 9.81818 9.30593 9.81818 8.72727C9.81818 8.14862 10.0481 7.59366 10.4572 7.18449C10.8664 6.77532 11.4213 6.54545 12 6.54545C12.5787 6.54545 13.1336 6.77532 13.5428 7.18449C13.9519 7.59366 14.1818 8.14862 14.1818 8.72727Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37273 -2.24174e-10 2.2467e-10 5.37273 0 12C-2.23678e-10 18.6273 5.37273 24 12 24C18.6273 24 24 18.6273 24 12C24 5.37273 18.6273 2.24174e-10 12 0ZM2.18182 12C2.18182 14.28 2.95964 16.3789 4.26327 18.0458C5.1788 16.8435 6.35989 15.8692 7.71429 15.1989C9.06869 14.5286 10.5597 14.1805 12.0709 14.1818C13.5625 14.1804 15.0348 14.5195 16.3756 15.1732C17.7163 15.827 18.8901 16.7781 19.8076 17.9542C20.7529 16.7145 21.3893 15.2675 21.6642 13.733C21.9392 12.1985 21.8448 10.6206 21.3889 9.1298C20.933 7.63902 20.1286 6.27823 19.0423 5.16004C17.9561 4.04185 16.6192 3.19839 15.1422 2.69946C13.6653 2.20054 12.0908 2.06048 10.5489 2.29088C9.00711 2.52128 7.54232 3.11552 6.27575 4.02442C5.00918 4.93333 3.97725 6.13077 3.26534 7.51767C2.55343 8.90457 2.18202 10.4411 2.18182 12ZM12 21.8182C9.74613 21.8216 7.56029 21.0462 5.81236 19.6233C6.51592 18.6161 7.45237 17.7937 8.54203 17.2262C9.63169 16.6587 10.8423 16.3628 12.0709 16.3636C13.2842 16.3627 14.4802 16.6512 15.5596 17.2052C16.6389 17.7592 17.5706 18.5628 18.2771 19.5491C16.5156 21.0182 14.2937 21.8214 12 21.8182Z"
      />
    </svg>
  );
};

export default ProfileIcon;