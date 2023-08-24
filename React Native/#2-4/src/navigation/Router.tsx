import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerStack, NavigationProps, } from './types';
import {projectUrl} from '../utils/consts';
import {CustomDrawerContent} from '../components/CustomDrawer';
import {getHeaderTitle} from '@react-navigation/elements';
import {TopBar} from '../components/TopBar';
import {LanguageEnum} from '../types/enum';
import Blog from '../screens/Blog';
import Home from '../screens/Home';
import { Shop } from '../screens/Shop';



const Drawer = createDrawerNavigator<DrawerStack>();

interface ScreenComponents {
  [key: string]: React.FC<NavigationProps>;
}

const currentLang: string = LanguageEnum.EN;
export const Router = () => {
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
      <NavigationContainer>
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
      </NavigationContainer>
  );
};
