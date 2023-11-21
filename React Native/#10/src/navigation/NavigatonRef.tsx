import {createNavigationContainerRef} from '@react-navigation/native';
import { StackType } from "./types";

export const navigatonRef = createNavigationContainerRef<StackType>();

export function navigateError() {
  navigatonRef.navigate('Error');
}
