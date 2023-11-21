import {createContext, Dispatch, ReactNode, useEffect, useState} from 'react';
import {LanguageEnum} from '../types/enum';
import {request} from '../services/request';
import {projectUrl} from '../utils/consts';
import {useGetLocales} from '../services/api';
import {ILocalEntity} from 'oneentry/dist/locales/localesInterfaces';

type ContextProps = {
  activeLanguage: LanguageEnum;
  languagesData: any;
  setActiveLanguage: Dispatch<LanguageEnum>;
};
export const LanguageContext = createContext<ContextProps>({
  activeLanguage: LanguageEnum.EN,
  setActiveLanguage(value: LanguageEnum): void {},
  languagesData: null,
});

type ProviderProps = {
  children: ReactNode;
};
export const LanguageProvider = ({children}: ProviderProps) => {
  const [languagesData, setLanguagesData] = useState<DropdownItem[]>([]);
  const {locales} = useGetLocales();
  const [activeLanguage, setActiveLanguage] = useState<LanguageEnum>(
    LanguageEnum.EN,
  );

  useEffect(() => {
    (async () => {
      locales &&
        locales.map((lang: ILocalEntity) => {
          const newLang: DropdownItem = {
            label: lang.shortCode.toUpperCase(),
            value: lang.code,
          };
          setLanguagesData(prevState => [...prevState, newLang]);
        });
    })();
  }, [locales]);

  const value = {
    activeLanguage,
    languagesData,
    setActiveLanguage,
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
