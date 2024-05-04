import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import {setUpPlayer, addTrack} from './MusicPlayerServices';
import MusicPlayer from './src/Screens/MusicPlayer';

const App = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup = await setUpPlayer();

    // console.log(isSetup);

    if (isSetup) {
      await addTrack();
    }

    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator></ActivityIndicator>
      </SafeAreaView>
    );
  }

 

  return (
   <View style={styles.container}>
    <StatusBar barStyle={'light-content'}></StatusBar>
    <MusicPlayer/>
   </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = App;