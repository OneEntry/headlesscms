import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import {useAppNavigation} from '../navigation/types';
import {useContext, useEffect, useState} from 'react';
import {LanguageContext} from '../providers/LanguageContext';
import CustomDropdown from './CustomDropdown';
import X from '../assets/icons/x.svg';

type NestedObject = Page & {
  children: [];
};

const createNestedArray = (
  objects: NestedObject[],
  parentId: null | number = null,
): any[] => {
  const nestedArray: any[] = [];
  objects.map((object: any) => {
    if (object.parentId === parentId) {
      const nestedChildren: any[] = createNestedArray(objects, object.id);
      if (nestedChildren.length) {
        object.children = nestedChildren;
      }
      nestedArray.push(object);
    }
  });
  return nestedArray;
};
type SubPageType = {
  page: Page;
};

const SubPage = ({page}: SubPageType) => {
  const navigation = useAppNavigation();
  const {activeLanguage} = useContext(LanguageContext);
  return (
    <DrawerItem
      style={{paddingLeft: 10}}
      label={page?.localizeInfos[activeLanguage]?.title || 'no localization'}
      onPress={() =>
        navigation.navigate(page?.pageUrl, {
          pageUrl: page?.pageUrl,
          title: page?.pageUrl,
        })
      }
      key={page?.pageUrl}
    />
  );
};

export function CustomDrawerContent(props: any) {
  const {menu} = props;
  const [nestedPages, setNestedPages] = useState<any[]>([]);
  const {languagesData, activeLanguage} = useContext(LanguageContext);
  // const progress = useDrawerProgress();
  // const inputRange: number[] = [0, 1];
  //
  // // const translateX = Animated.interpolateNode(progress, {
  // //   inputRange: [0, 1],
  // //   outputRange: [-100, 0],
  // // });
  useEffect(() => {
    if (menu) {
      setNestedPages(createNestedArray(menu?.pages));
    }
  }, [menu]);

  const onRequestClose = () => {
    props.navigation.closeDrawer();
  };

  const navigation = useAppNavigation();
  return (
    <DrawerContentScrollView
      style={{width: '100%', height: '100%', backgroundColor: 'white'}}
      {...props}>
      <View style={{padding: 15, paddingBottom: 40}}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: 127.5, height: 35.1, objectFit: 'contain'}}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: 10,
          width: 80,
          height: 670,
          borderWidth: 1.5,
          backgroundColor: 'white',
          borderColor: '#B0BCCE',
          borderBottomLeftRadius: 30,
          borderTopLeftRadius: 30,
          top: '30%',
          shadowOffset: {width: 0, height: 4},
          shadowColor: '#4C4D5654',
          shadowOpacity: 0.33,
          shadowRadius: 10,
        }}>
        <TouchableOpacity
          onPress={onRequestClose}
          style={{position: 'absolute', top: 15, left: 20, zIndex: 50}}>
          <X />
        </TouchableOpacity>
      </View>

      {nestedPages.map((page: NestedObject) => (
        <View key={page.pageUrl}>
          <DrawerItem
            label={page?.localizeInfos[activeLanguage]?.title || 'no localization'}
            onPress={() =>
              navigation.navigate(page?.pageUrl, {
                pageUrl: page?.pageUrl,
                title: page?.pageUrl,
              })
            }
            key={page.pageUrl}
          />
          {page.children &&
            page.children.map((child: Page) => {
              return <SubPage key={child.pageUrl} page={child} />;
            })}
        </View>
      ))}
      <View style={{width: 150}}>
        {languagesData && <CustomDropdown data={languagesData} />}
      </View>
    </DrawerContentScrollView>
  );
}
