import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Back from '../assets/icons/back.svg';
import {useNavigation} from '@react-navigation/native';
interface Props {}

const GoBackButton: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const onPress = () => navigation.goBack();
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <View>
          <Back />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(GoBackButton);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    shadowColor: 'black',
    padding: 12,
    borderRadius: 10000,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: {height: 5, width: 0},
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
