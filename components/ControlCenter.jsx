import React, {Component} from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {playbackService} from '../MusicPlayerServices';


const ControlCenter = () => {

    const playBackState = usePlaybackState();
    console.log("pppppp",playBackState);

    //next button
    const skiptoNext = async () => {
      await TrackPlayer.skipToNext();
    };
    //nprevious button
    const skiptoPrevious = async () => {
      await TrackPlayer.skipToPrevious();
    };

    const tooglePlayback = async (playback) => {
      const currentTrack = await TrackPlayer.getCurrentTrack();

      if (currentTrack !== null) {
        if (playback === State.Paused || playback === State.Ready) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.pause();
        }
      }
    };
  

  return (
    <View style={styles.container}>
        <Pressable onPress={skiptoPrevious}>
        <Icon style={styles.icon} name='skip-previous' size={40}/>
        </Pressable>
        <Pressable onPress={() => tooglePlayback(playBackState)}>
        <Icon style={styles.icon} name={playBackState && playBackState.state === State.Playing ? 'pause' : 'play-arrow'} size={40}/>
        </Pressable>
        <Pressable onPress={skiptoNext}>
        <Icon style={styles.icon} name='skip-next' size={40}/>
        </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
    playButton: {
        marginHorizontal: 24,
    },
});

 export default ControlCenter;