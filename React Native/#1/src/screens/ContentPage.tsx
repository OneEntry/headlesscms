import {DrawerScreenProps} from '@react-navigation/drawer';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {DrawerStack} from '../App';

type NavigationProps = DrawerScreenProps<DrawerStack>;

export const ContentPage = ({navigation, route}: NavigationProps) => {
  const [pageInfo, setPageInfo] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://react-native.oneentry.cloud/api/content/${route.params.pageUrl}`,
        {
          method: 'get',
          headers: {
            Authorization: 'Bearer <AUTH_TOKEN>',
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();
      setPageInfo(result);
    })();
  }, []);

  if (!pageInfo) return null;

  return (
    <View>
      <Text style={{fontSize: 44}}>{route.params.title}</Text>
    </View>
  );
};
