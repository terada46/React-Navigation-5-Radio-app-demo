import React from 'react';
import {
  Text,
} from 'react-native';
import { TAB_TEXT_COLOR } from '../config/constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import normailize from '../components/normailizeText';

export const TabText = ({style, children, selected}) => (
    <Text style={[styles.defaultStyle, 
      selected ? styles.tabSize_selected : styles.tabSize, style]}>
      {children}
    </Text>
);

export const MenuTitle = ({style, children}) => (
  <Text style={[styles.defaultStyle, styles.menuSize, style]}>
    {children}
  </Text>
);

export const LabelText = ({style, children}) => (
  <Text style={[styles.defaultStyle, styles.labelSize, style]}>
    {children}
  </Text>
);

export const HeaderTitleText = ({style, children}) => (
  <Text style={[styles.defaultStyle, styles.headerStyle, style]}
    numberOfLines={1}
  >
    {children}
  </Text>
);

const styles = EStyleSheet.create({
  defaultStyle: {
      fontWeight: '300',
      color: TAB_TEXT_COLOR
  },
  tabSize: {
    fontSize: normailize(12),
  },
  tabSize_selected: {
    fontSize: normailize(13.5)
  },
  menuSize: {
    fontSize: normailize(15),
  },
  headerStyle: {
    fontSize: normailize(16),
    fontWeight:'400'
  },
  labelSize: {
    fontSize: normailize(14),
  }
});