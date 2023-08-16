import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LanguageEnum} from '../types/enums';
import {useAuth} from './AuthProvider';
import {Onboarding} from '../screens/Onboarding';
import {SignIn} from '../screens/SignIn';
import {ContentPage} from '../screens/ContentPage';

export type DrawerStack = {
  [key: string]: {
    pageUrl: string;
    title: string;
  };
};

const Drawer = createDrawerNavigator<DrawerStack>();
const Stack = createNativeStackNavigator();

const currentLanguage = LanguageEnum.EN;

export const NavigationProvider = () => {
  const {isAuth} = useAuth();

  const [pages, setPages] = useState<Page[]>();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://react-native.oneentry.cloud/api/content/pages',
        {
          method: 'get',
          headers: {
            Authorization: 'Bearer <AUTH_TOKEN>',
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();
      setPages(result);
    })();
  }, []);

  if (!pages?.length) return <></>;

  return (
    <NavigationContainer>
      {isAuth ? (
        <Drawer.Navigator>
          {pages?.map(item => (
            <Drawer.Screen
              name={item.pageUrl}
              options={{
                drawerLabel: item.localizeInfos?.[currentLanguage].title,
                title: item.localizeInfos[currentLanguage].menuTitle,
              }}
              initialParams={{
                pageUrl: item.pageUrl,
                title: item.localizeInfos[currentLanguage].title,
              }}
              key={item.pageUrl}
              component={ContentPage}
            />
          ))}
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
