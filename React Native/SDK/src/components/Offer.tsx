import React, {memo} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Paragraph} from './Paragraph';
import {useNavigation} from '@react-navigation/native';
import {useAppNavigation} from '../navigation/types';

interface Props {
  pic: string;
  text: string;
  productId: number    ;
}

const Offer: React.FC<Props> = ({pic, text, productId}) => {
  const navigation = useAppNavigation();
  const onPress = () => {
    if (productId) {
      navigation.navigate('Product', {id: productId});
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{uri: pic}}
        resizeMode="cover"
        imageStyle={{borderRadius: 20}}
        style={[{borderRadius: 20}, styles.container]}>
        <View style={styles.text}>
          <Paragraph
            weight={'700'}
            size={20}
            color={'white'}
            style={styles.text}>
            {text}
          </Paragraph>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(Offer);

const styles = StyleSheet.create({
  container: {
    width: 185,
    height: 260,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  text: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 10,
  },
});
