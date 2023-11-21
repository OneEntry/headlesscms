import {StyleSheet, TextInput, View} from 'react-native';
import {ComponentTypeEnum} from '../screens/ContentPage';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import SearchIcon from '../assets/icons/search-icon.svg';
import {Dispatch} from 'react';

type SearchBarProps = {
  value: string;
  setValue: Dispatch<string>;
};
export const SearchBar = (props: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'Search'}
        value={props.value}
        onChangeText={value => props.setValue(value)}
      />
      <SearchIcon style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: styleColors.lightGray,
    backgroundColor: styleColors.gray100,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: ROUNDED_RADIUS,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: styleColors.gray300,
  },
  input: {
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 16,
  },
});
