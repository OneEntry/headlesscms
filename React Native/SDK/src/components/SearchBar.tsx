import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import {ComponentTypeEnum} from '../screens/ContentPage';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import SearchIcon from '../assets/icons/search-icon.svg';
import {Dispatch, useState} from 'react';

type SearchBarProps = {
  value: string;
  setValue: Dispatch<string>;
  loading: boolean;
};
export const SearchBar = (props: SearchBarProps) => {
  // const [searchWaiting, setSearchWaiting] = useState<NodeJS.Timeout | null>();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'Search'}
        value={props.value}
        onChangeText={value => {
          props.setValue(value);
        }}
      />
      <View style={{position: 'absolute', right: 3, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
        {props.loading ? (
          <ActivityIndicator style={{width: 24, height: 24}} />
        ) : (
          <SearchIcon style={styles.icon} />
        )}
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 16,
  },
});
