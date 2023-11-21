import {NavigationContainer} from '@react-navigation/native';
import {ContentPage} from '../screens/ContentPage';
import React, { useContext, useEffect, useState } from "react";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerStack, NavigationProps, StackType} from './types';
import {projectUrl} from '../utils/consts';
import {CustomDrawerContent} from '../components/CustomDrawer';
import {getHeaderTitle} from '@react-navigation/elements';
import {TopBar} from '../components/TopBar';
import {Shop} from '../screens/Shop';
import {Home} from '../screens/Home';
import {Blog} from '../screens/Blog';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Product} from '../screens/ProductDetail';
import ErrorScreen from '../screens/ErrorScreen';
import { navigateError, navigatonRef } from "./NavigatonRef";
import { LanguageContext } from "../providers/LanguageContext";
import { getPages } from "../services/request";

const Drawer = createDrawerNavigator<DrawerStack>();
const Stack = createNativeStackNavigator<StackType>();

interface ScreenTypes {
  [key: string]: React.FC<NavigationProps>;
}

export const DrawerStackNavigator = () => {
  const [pages, setPages] = useState<Page[]>();
  const [menu, setMenu] = useState<Menu>();
  const {activeLanguage} = useContext(LanguageContext);
  useEffect(() => {
    (async () => {
      const result = await getPages(activeLanguage);
      setPages(result);
    })();
  }, [activeLanguage]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${projectUrl}/api/content/menus/marker/main`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();
      setMenu(result);
    })();
  }, []);

  const dynamicScreens: ScreenTypes = {
    shop: Shop,
    home: Home,
    blog: Blog,
  };

  if (!pages?.length) {
    return <></>;
  }
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent menu={menu} {...props} />}
      screenOptions={{
        header: ({navigation, route, options}) => {
          const title = getHeaderTitle(options, route.name);

          return <TopBar title={title} color={'gray'} />;
        },
      }}
      initialRouteName={'home'}>
      {pages.map(page => {
        if (dynamicScreens[page.pageUrl] !== undefined) {
          return (
            <Drawer.Screen
              name={page.pageUrl}
              component={dynamicScreens[page.pageUrl]}
              key={page.pageUrl}
              options={{
                drawerLabel: page.localizeInfos[activeLanguage]?.title,
                title: page.localizeInfos[activeLanguage]?.menuTitle,
              }}
              initialParams={{
                pageUrl: page.pageUrl,
                title: page.localizeInfos[activeLanguage]?.title,
              }}
            />
          );
        }
      })}
    </Drawer.Navigator>
  );
};

export const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'DrawerStack'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'DrawerStack'} component={DrawerStackNavigator} />
        <Stack.Screen name={'Product'} component={Product} />
        <Stack.Screen name={'Error'} component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
