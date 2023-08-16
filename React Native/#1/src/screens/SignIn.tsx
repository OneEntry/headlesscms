import {StyleSheet, Text, View} from 'react-native';
import {Screen} from '../components/Screen';
import {Logo} from '../components/icons/Logo';
import {styleColors} from '../utils/consts';
import {Button} from '../components/Button';
import {Spacer} from '../components/Spacer';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../providers/AuthProvider';

export const SignIn = () => {
  const navigation = useNavigation();
  const {changeAuth} = useAuth();

  return (
    <Screen edges={['top', 'bottom', 'horizontal']}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </Text>
      <Spacer />
      <Button rounded onPress={() => changeAuth(true)}>
        LOGIN
      </Button>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 62,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: styleColors.gray,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 32,
    color: styleColors.lightGray,
  },
});
