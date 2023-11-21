import React, {memo} from 'react';
import {Button} from '../components/Button';
import {Text, TouchableOpacity, View} from 'react-native';
import {Paragraph} from '../components/Paragraph';
import {Screen} from '../components/Screen';
import {Spacer} from '../components/Spacer';
import {useAppNavigation} from '../navigation/types';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';

interface Props {
  errorTitle: string;
  errorDescription: string;
}

const ErrorScreen: React.FC<Props> = ({errorTitle, errorDescription}) => {
  const navigation = useAppNavigation();
  return (
    <View style={{height: '100%'}}>
      <Screen
        white
        style={{height: '100%', justifyContent: 'center'}}
        edges={['horizontal']}>
        <Paragraph size={64} weight={'bold'}>
          {errorTitle}
        </Paragraph>
        <Paragraph size={32}>{errorDescription}</Paragraph>
        <View style={{marginTop: 100}} />
        <Button
          rounded
          style={{backgroundColor: styleColors.background}}
          paragraphProps={{style: {color: '#fff'}, weight: 'bold', size: 16}}
          onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </Screen>
    </View>
  );
};

export default memo(ErrorScreen);
