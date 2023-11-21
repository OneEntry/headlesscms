import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerStack, NavigationProps, StackType} from './types';
import {CustomDrawerContent} from '../components/CustomDrawer';
import {getHeaderTitle} from '@react-navigation/elements';
import {TopBar} from '../components/TopBar';
import {Shop} from '../screens/Shop';
import {Home} from '../screens/Home';
import {Blog, EmptyContent} from '../screens/Blog';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LanguageContext} from '../providers/LanguageContext';
import {getMenu, getPages} from '../services/request';
import {Dimensions} from 'react-native';
import {Product} from '../screens/ProductDetail';
import ContentNotVisible from '../screens/ContentNotVisible';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TopBarV2 from "../components/v2/TopBarV2";
import { useGetMenu, useGetPages } from "../services/api";

const Drawer = createDrawerNavigator<DrawerStack>();
const Stack = createNativeStackNavigator<StackType>();

interface ScreenTypes {
  [key: string]: React.FC<NavigationProps>;
}

export const DrawerStackNavigator = () => {
  const insets = useSafeAreaInsets();
  const [refresh, setRefresh] = useState(false);
  const {menu} = useGetMenu({marker: 'main'});
  const {pages} = useGetPages({});
  const onRefresh = () => {
    setRefresh(true);
  };

  const {activeLanguage} = useContext(LanguageContext);

  const dynamicScreens: ScreenTypes = {
    shop: Shop,
    home: Home,
    blog: Blog,
    null: ContentNotVisible,
  };

  if (!pages?.length) {
    return <></>;
  }
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent menu={menu} {...props} />}
      screenOptions={{
        header: ({route, options}) => {
          const title = getHeaderTitle(options, route.name);
          return <TopBarV2 isSearch={title !== 'Home'} />;
        },
        overlayColor: 'white',
        drawerStyle: {
          width: Dimensions.get('window').width,
        },
      }}
      initialRouteName={'home'}>
      {pages?.map(page => {
        if (page?.isVisible) {
          return (
            <Drawer.Screen
              name={page.pageUrl}
              component={dynamicScreens[page.templateIdentifier]}
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
        return (
          <Drawer.Screen
            name={page.pageUrl}
            key={page.pageUrl}
            options={{
              drawerLabel: page.localizeInfos[activeLanguage]?.title,
              title: page.localizeInfos[activeLanguage]?.menuTitle,
            }}
            initialParams={{
              pageUrl: page.pageUrl,
              title: page.localizeInfos[activeLanguage]?.title,
            }}>
            {() => <EmptyContent insets={insets} onRefresh={onRefresh} />}
          </Drawer.Screen>
        );
      })}
    </Drawer.Navigator>
  );
};

export const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'DrawerStack'}
        screenOptions={{headerShown: false, gestureDirection: 'vertical'}}>
        <Stack.Screen name={'DrawerStack'} component={DrawerStackNavigator} />
        <Stack.Screen name={'Product'} component={Product} />
        {/*<Stack.Screen name={'Error'} component={ErrorScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
