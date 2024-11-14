const FavoritesIcon = (props?: { active?: boolean }) => {
  return (
    <svg
      width="30"
      height="24"
      viewBox="0 0 30 24"
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
        d="M12.7701 1.20774C11.466 0.430326 9.89043 0 8.18182 0C6.01264 0.00236473 3.93303 0.810007 2.39919 2.24575C0.865348 3.6815 0.00252629 5.62812 0 7.65857C0 11.3857 2.48182 15.2648 7.37727 19.186C9.62052 20.9752 12.0437 22.5569 14.6127 23.9088C14.7318 23.9687 14.8648 24 15 24C15.1352 24 15.2682 23.9687 15.3873 23.9088C17.9563 22.5569 20.3795 20.9752 22.6227 19.186C27.5182 15.2648 30 11.3857 30 7.65857C29.9975 5.62812 29.1347 3.6815 27.6008 2.24575C26.067 0.810007 23.9874 0.00236473 21.8182 0C20.1096 0 18.534 0.430326 17.2299 1.20774C16.3483 1.73327 15.5907 2.41742 15 3.23447C14.4093 2.41742 13.6517 1.73327 12.7701 1.20774ZM27 7.66068C26.9981 6.49143 26.5028 5.32714 25.5507 4.43595C24.5918 3.53842 23.2521 3.00195 21.8164 3C19.7918 3.00048 18.2621 3.84284 17.4312 4.99216L15 8.35482L12.5688 4.99216C11.7379 3.84284 10.2082 3.00048 8.18356 3C6.7479 3.00195 5.40817 3.53842 4.44932 4.43595C3.4973 5.32709 3.00198 6.49128 3 7.66044C3.00085 10.0064 4.59568 13.1136 9.25017 16.8424C11.0477 18.2759 12.9708 19.5682 15 20.7054C17.0291 19.5682 18.9522 18.276 20.7496 16.8426C25.4041 13.1138 26.999 10.0067 27 7.66068Z"
      />
    </svg>
  );
};

export default FavoritesIcon;