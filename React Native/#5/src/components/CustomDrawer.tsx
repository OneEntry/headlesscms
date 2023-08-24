import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {Linking, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { DrawerStack, useAppNavigation } from "../navigation/types";
import { useEffect, useState } from 'react';

type NestedObject = Page & {
  children: [];
};
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
  return (
    <DrawerItem
      style={{paddingLeft: 10}}
      label={page.pageUrl}
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
  const [nestedPages, setNestedPages] = useState<any>([]);
  const navigation = useAppNavigation();
  useEffect(() => {
    if (menu?.pages) {
      setNestedPages(createNestedArray(menu.pages));
      console.log(createNestedArray(menu.pages));
    }
  }, [menu])
  
  return (
    <DrawerContentScrollView {...props}>
      {nestedPages.map((page: NestedObject) => (
        <View>
          <DrawerItem
            label={page.pageUrl}
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
    </DrawerContentScrollView>
  );
}
