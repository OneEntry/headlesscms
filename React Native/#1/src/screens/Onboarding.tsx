import {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Button} from '../components/Button';
import {styleColors} from '../utils/consts';
import {Screen} from '../components/Screen';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export const Onboarding = () => {
  const navigation = useNavigation();
  const [pages, setPages] = useState([{name: 1}, {name: 2}, {name: 3}]);

  const renderItem = ({item}) => (
    <View style={styles.carouselItem}>
      <Text style={{color: 'black'}}>{item.name}</Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Carousel
        width={width}
        height={height}
        style={styles.carousel}
        data={pages}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
          </View>
        )}
      />
      <Screen edges={['bottom', 'horizontal']}>
        <Button
          rounded
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}>
          GET STARTED
        </Button>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: styleColors.background,
  },
  carouselItem: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: styleColors.background,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
