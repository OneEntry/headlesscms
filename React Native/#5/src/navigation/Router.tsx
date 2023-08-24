import {NavigationContainer} from '@react-navigation/native';
import {ContentPage} from '../screens/ContentPage';
import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerStack, NavigationProps, StackType} from './types';
import {projectUrl} from '../utils/consts';
import {CustomDrawerContent} from '../components/CustomDrawer';
import {getHeaderTitle} from '@react-navigation/elements';
import {TopBar} from '../components/TopBar';
import {LanguageEnum} from '../types/enum';
import Blog from '../screens/Blog';
import Home from '../screens/Home';
import { Shop } from '../screens/Shop';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '../screens/ProductDetail';



const Drawer = createDrawerNavigator<DrawerStack>();
const Stack = createNativeStackNavigator<StackType>();

interface ScreenComponents {
  [key: string]: React.FC<NavigationProps>;
}

const currentLang: string = LanguageEnum.EN;
export const DrawerComponent = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [menu, setMenu] = useState<Menu>();
  useEffect(() => {
    (async () => {
      const response = await fetch(`${projectUrl}/api/content/pages`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log(result);
      setPages(result);
    })();
  }, []);

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
      console.log(result);
      setMenu(result);
    })();
  }, []);

  if (!pages?.length) {
    return <></>;
  }

  const dynamicScreens: ScreenComponents = {
    shop: Shop,
    home: Home,
    blog: Blog,
  };
  return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent menu={menu} {...props} />}
        screenOptions={{
          header: ({navigation, route, options}) => {
            const title = getHeaderTitle(options, route.name);

            return <TopBar title={title} color={'gray'} />;
          },
        }}>
        {pages.map((page: Page) => {
          if (dynamicScreens[page.pageUrl] !== undefined) {
            return (
              <Drawer.Screen
                name={page.pageUrl}
                component={dynamicScreens[page.pageUrl]}
                key={page.pageUrl}
                options={{
                  drawerLabel: page.localizeInfos[currentLang].title,
                  title: page.localizeInfos[LanguageEnum.EN].menuTitle,
                }}
                initialParams={{
                  pageUrl: page.pageUrl,
                  title: page.localizeInfos[LanguageEnum.EN].title,
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
      <Stack.Navigator initialRouteName={"DrawerStack"} screenOptions={{headerShown: false}}>
        <Stack.Screen name={"DrawerStack"} component={DrawerComponent} />
        <Stack.Screen name={"Product"} component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
