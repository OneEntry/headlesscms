import {createContext, Dispatch, ReactNode, useEffect, useState} from 'react';
import {LanguageEnum} from '../types/enum';
import {request} from '../services/request';
import {projectUrl} from '../utils/consts';

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
  const [activeLanguage, setActiveLanguage] = useState<LanguageEnum>(
    LanguageEnum.EN,
  );

  useEffect(() => {
    (async () => {
      const response = await request(
        `${projectUrl}/api/content/locales/active/all`,
      );
      console.log(response);
      response.map((lang: Language) => {
        const newLang: DropdownItem = {
          label: lang.shortCode.toUpperCase(),
          value: lang.code,
        };
        setLanguagesData(prevState => [...prevState, newLang]);
      });
    })();
  }, []);

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
