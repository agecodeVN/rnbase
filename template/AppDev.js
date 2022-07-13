import React, { useEffect, useState } from 'react';
import { StyleSheet, NativeModules } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'lang';
import dayjs from 'dayjs';

import _App from './App';

const LANGUAGES = ['ja', 'en'];

const App = () => {
  const [lang, setLang] = useState();
  const [refresh, setRefresh] = useState(false);

  const loadPreviousLang = async () => {
    let savedLang = null;
    try {
      savedLang = await AsyncStorage.getItem('language');
    } catch {}
    setLang(savedLang || LANGUAGES[0]);
  };

  useEffect(() => {
    console.log(NativeModules);
    loadPreviousLang();
  }, []);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      dayjs.locale(lang);
      AsyncStorage.setItem('language', lang);
      setRefresh(true);
    }
  }, [lang]);

  const renderLanguageSwitch = () => {
    return (
      <View absR border customStyle={styles.language}>
        {LANGUAGES.map(item => {
          const isSelected = item === lang;
          return (
            <Pressable key={item} onPress={() => setLang(item)}>
              <View
                background-white
                background-primary={isSelected}
                center
                padding-xxs>
                <Text white={isSelected}>{item}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    !!lang && (
      <>
        {!refresh && <_App />}
        {renderLanguageSwitch()}
      </>
    )
  );
};

const styles = StyleSheet.create({
  language: {
    bottom: 120
  }
});

export default App;
