import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {Linking, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerStack, useAppNavigation} from '../navigation/types';
import {useContext, useEffect, useState} from 'react';
import {LanguageContext} from '../providers/LanguageContext';
import CustomDropdown from './CustomDropdown';

type NestedObject = Page & {
  children: [];
};

const useMainNavigation = () => useNavigation<DrawerNavigationProp<any>>();

const createNestedArray = (
  objects: NestedObject[],
  parentId: null | number = null,
): [] => {
  const nestedArray: [] = [];
  objects.map(object => {
    if (object.parentId === parentId) {
      const nestedChildren: [] = createNestedArray(objects, object.id);
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
      label={page.localizeInfos[activeLanguage].title}
      onPress={() =>
        navigation.navigate(page.pageUrl, {
          pageUrl: page.pageUrl,
          title: page.pageUrl,
        })
      }
      key={page.pageUrl}
    />
  );
};

export function CustomDrawerContent(props: any) {
  const {menu} = props;
  const [nestedPages, setNestedPages] = useState([]);
  const {languagesData, activeLanguage} = useContext(LanguageContext);
  useEffect(() => {
    if (menu) {
      setNestedPages(createNestedArray(menu?.pages));
    }
  }, [menu]);
  const navigation = useAppNavigation();
  return (
    <DrawerContentScrollView {...props}>
      {nestedPages.map((page: NestedObject) => (
        <View key={page.pageUrl}>
          <DrawerItem
            label={page.localizeInfos[activeLanguage].title}
            onPress={() =>
              navigation.navigate(page.pageUrl, {
                pageUrl: page.pageUrl,
                title: page.pageUrl,
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
