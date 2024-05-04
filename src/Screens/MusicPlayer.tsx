import React, {Component, useState} from 'react';
import {Text, StyleSheet, View, Dimensions, Image, FlatList} from 'react-native';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playListData} from '../assets/constants';
import SongInfo from '../../components/SongInfo';
import SongsSlider from '../../components/SongsSlider';
import ControlCenter from '../../components/ControlCenter';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
        case Event.PlaybackTrackChanged:
            const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
          setTrack(playingTrack);
          break;
    }   
  }); 

  const renderArtWorks = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
            {track?.artwork && <Image 
            style={styles.albumArtImg}
            source={{uri: track?.artwork?.toString()}}
            />}
        </View>
      </View>
    );
  };

  return (
  <View>
    <FlatList
    horizontal
    data={playListData}
    renderItem={renderArtWorks}
    keyExtractor={songs => songs.id.toString()}
    />

    <SongInfo track={track} />
        <SongsSlider/>
        <ControlCenter/>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});
export default MusicPlayer;
