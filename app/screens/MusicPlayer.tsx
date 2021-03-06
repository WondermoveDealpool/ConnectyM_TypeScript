// import React, {useEffect, useRef, useState} from 'react';
// import {Dimensions, TouchableOpacity, View, Animated} from 'react-native';
// import styled from 'styled-components/native';

// import IonIcon from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import Slider from '@react-native-community/slider';

// import TrackPlayer, {
//   Capability,
//   Event,
//   RepeatMode,
//   State,
//   usePlaybackState,
//   useProgress,
//   useTrackPlayerEvents,
// } from 'react-native-track-player';

// const {width, height} = Dimensions.get('window');

// const songs = [
//   {
//     title: '그땐 어렸으니까',
//     artist: '기리보이',
//     artwork: require('../assets/artwork/cover1.jpeg'),
//     url: require('../assets/songs/song1.mp3'),
//     id: 1,
//     // duration: 311,
//   },
//   {
//     title: 'Home',
//     artist: 'Kid Milli',
//     artwork: require('../assets/artwork/cover2.jpeg'),
//     url: require('../assets/songs/song2.mp3'),
//     id: 2,
//     // duration: 311,
//   },
//   {
//     title: '라식',
//     artist: '기리보이',
//     artwork: require('../assets/artwork/cover3.jpeg'),
//     url: require('../assets/songs/song3.mp3'),
//     id: 3,
//     // duration: 311,
//   },
// ];

// const SafeAreaViewContainer = styled.SafeAreaView`
//   flex: 1;
//   background-color: #ffffff;
// `;

// const MainContainer = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;

// const ArtworkWrapper = styled.View`
//   width: 300px;
//   height: 300px;
//   margin-bottom: 25px;
// `;

// const ArtworkImage = styled.Image`
//   width: 100%;
//   height: 100%;
//   border-radius: 12px;
// `;

// const TitleText = styled.Text`
//   font-size: 18px;
//   font-weight: 600;
//   text-align: center;
//   color: black;
// `;

// const ArtistText = styled.Text`
//   font-size: 16px;
//   font-weight: 200;
//   text-align: center;
//   color: black;
//   padding-top: 10px;
// `;

// const SliderContainer = styled.Slider`
//   width: 350px;
//   height: 40px;
//   margin-top: 25px;
//   flex-direction: row;
// `;

// const SliderLabelContainer = styled.View`
//   width: 340px;
//   flex-direction: row;
//   justify-content: space-between;
// `;

// const SliderLabelText = styled.Text`
//   color: black;
// `;

// const ButtonContainer = styled.View`
//   flex-direction: row;
//   width: 60%;
//   justify-content: space-between;
//   margin-top: 15px;
// `;

// const BottomContainer = styled.View`
//   border-top-color: #393e46;
//   border-top-width: 1px;
//   width: width;
//   align-items: center;
//   padding-top: 15px;
// `;

// const BottomControls = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   width: 80%;
// `;

// const setupPlayer = async () => {
//   await TrackPlayer.setupPlayer();

//   //Widget Setting for Android
//   await TrackPlayer.updateOptions({
//     capabilities: [
//       Capability.Play,
//       Capability.Pause,
//       Capability.SkipToNext,
//       Capability.SkipToPrevious,
//       Capability.Stop,
//     ]
//   })

//   await TrackPlayer.add(songs);
// };

// const togglePlayback = async (playbackState: State) => {
//   const currentTrack = await TrackPlayer.getCurrentTrack();

//   if (currentTrack !== null) {
//     if (playbackState === State.Paused) {
//       await TrackPlayer.play();
//     } else {
//       await TrackPlayer.pause();
//     }
//   }
// };

// const MusicPlayer = () => {
//   //UI
//   const scrollX = useRef(new Animated.Value(0)).current;

//   const [songIndex, setSongIndex] = useState(0);

//   const songSlider = useRef(null);

//   //Track
//   const playbackState = usePlaybackState();
//   const progress = useProgress();

//   //Track repeat mode control
//   const [repeatMode, setRepeatMode] = useState('off');

//   //Repeat Mode Additional Control
//   const [trackArtwork, setTrackArtwork] = useState();
//   const [trackArtist, setTrackArtist] = useState();
//   const [trackTitle, setTrackTitle] = useState();

//   useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
//     if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
//       const track = await TrackPlayer.getTrack(event.nextTrack);
//       const {title, artwork, artist} = track;
//       // const titles = track.title;
//       // const artworks = track.artwork;
//       // const artists = track.artist;
//       setTrackTitle(title);
//       setTrackArtist(artist);
//       setTrackArtwork(artwork);
//     }
//   });

//   const repeatIcon = () => {
//     if (repeatMode === 'off') {
//       return 'repeat-off';
//     } else if (repeatMode === 'track') {
//       return 'repeat-once';
//     } else if (repeatMode === 'repeat') {
//       return 'repeat';
//     }
//   };

//   const changeRepeatMode = () => {
//     if (repeatMode === 'off') {
//       TrackPlayer.setRepeatMode(RepeatMode.Track);
//       setRepeatMode('track');
//     } else if (repeatMode === 'track') {
//       TrackPlayer.setRepeatMode(RepeatMode.Queue);
//       setRepeatMode('repeat');
//     } else if (repeatMode === 'repeat') {
//       TrackPlayer.setRepeatMode(RepeatMode.Off);
//       setRepeatMode('off');
//     }
//   };

//   const skipTo = async (trackID: number) => {
//     TrackPlayer.skip(trackID);
//   };

//   useEffect(() => {
//     setupPlayer();
//     scrollX.addListener(({value}) => {
//       const index = Math.round(value / width);
//       // console.log('Scroll x', scrollX);
//       // console.log('Device Width', windowWidth);
//       skipTo(index);
//       setSongIndex(index);
//       // console.log('Index', index);
//     });

//     return () => {
//       scrollX.removeAllListeners();
//     };
//   }, []);

//   const skiptoNext = () => {
//     songSlider.current.scrollToOffset({
//       offset: (songIndex + 1) * width,
//     });
//   };

//   const skiptoPrevious = () => {
//     songSlider.current.scrollToOffset({
//       offset: (songIndex - 1) * width,
//     });
//   };

//   const renderSongs = ({index, item}) => {
//     return (
//       <Animated.View
//         style={{
//           width: width,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <ArtworkWrapper>
//           <ArtworkImage source={trackArtwork} />
//         </ArtworkWrapper>
//       </Animated.View>
//     );
//   };

//   return (
//     <SafeAreaViewContainer>
//       <MainContainer>
//         <View style={{width: width}}>
//           <Animated.FlatList
//             ref={songSlider}
//             data={songs}
//             renderItem={renderSongs}
//             keyExtractor={item => item.id}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             scrollEventThrottle={16}
//             onScroll={Animated.event(
//               [
//                 {
//                   nativeEvent: {
//                     contentOffset: {x: scrollX},
//                   },
//                 },
//               ],
//               {useNativeDriver: true},
//             )}
//           />
//         </View>
//         <View>
//           <TitleText>{trackTitle}</TitleText>
//           <ArtistText>{trackArtist}</ArtistText>
//         </View>
//         <View>
//           <SliderContainer
//             value={progress.position}
//             minimumValue={0}
//             maximumValue={progress.duration}
//             thumbTintColor="black"
//             minimumTrackTintColor="black"
//             maximumTrackTintColor="lightgray"
//             onSlidingComplete={async value => {
//               await TrackPlayer.seekTo(value);
//             }}
//           />
//           <SliderLabelContainer>
//             <SliderLabelText>
//               {new Date(progress.position * 1000).toISOString().substr(14,5)}
//             </SliderLabelText>
//             <SliderLabelText>
//               {new Date(progress.duration * 1000).toISOString().substr(14,5)}</SliderLabelText>
//           </SliderLabelContainer>
//         </View>

//         <ButtonContainer>
//           <TouchableOpacity onPress={skiptoPrevious}>
//             <IonIcon
//               name="play-skip-back-outline"
//               size={35}
//               color="black"
//               style={{marginTop: 25}}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
//             <IonIcon
//               name={
//                 playbackState === State.Playing
//                   ? 'ios-pause-circle'
//                   : 'ios-play-circle'
//               }
//               size={75}
//               color="black"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={skiptoNext}>
//             <IonIcon
//               name="play-skip-forward-outline"
//               size={35}
//               color="black"
//               style={{marginTop: 25}}
//             />
//           </TouchableOpacity>
//         </ButtonContainer>
//       </MainContainer>
//       <BottomContainer>
//         <BottomControls>
//           <TouchableOpacity onPress={() => { }}>
//             <IonIcon name="heart-outline" size={30} color="#777777" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={changeRepeatMode}>
//             <MaterialCommunityIcons
//               name={repeatIcon()}
//               size={30}
//               color={repeatMode !== 'off' ? 'black' : '#777777'}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => { }}>
//             <IonIcon name="share-outline" size={30} color="#777777" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => { }}>
//             <IonIcon name="ellipsis-horizontal" size={30} color="#777777" />
//           </TouchableOpacity>
//         </BottomControls>
//       </BottomContainer>
//     </SafeAreaViewContainer>
//   );
// };

// export default MusicPlayer;
