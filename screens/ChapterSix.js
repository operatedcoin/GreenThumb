import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio } from '../components/backgroundAudioHelper';
import Header from '../components/header';
import TimerComponent from '../components/timerComponent';
import BottomSheetModal from '../components/bottomSheet';
import { useIsFocused } from '@react-navigation/native';
import BeaconFTB from '../components/beaconFTB';
import LoadingSpinner from '../components/collectGame/loadingSpinner';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';



const ios = Platform.OS === 'ios';

const beaconsData = [
  {
    beaconName: "MsgEight",
    // beaconTitle: "Story Dot #1",
    // trackTitle: "Conspiracy",
    // audioName: "conspiracyV4.mp3",
    bgColor: "bg-purple-500"
  },
  // Add other beacons as needed...
];

export default function ChapterSix({ navigation }) {
  const isFocused = useIsFocused();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isHeaderModalVisible, setHeaderModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      playAudio(require('../audio/MysteryPulse.mp3'), 'pulse');
      return () => stopAudio('pulse'); // This stops 'beatOneHello.m4a' when navigating away from HomeScreen
    }, [])
  );

  useEffect(() => {
    if (isFirstLoad) {
      setBottomSheetVisible(true);
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  return (
    <View className="bg-neutral-100 flex-1">
        <Header 
        isModalVisible={isHeaderModalVisible} 
        setModalVisible={setHeaderModalVisible} 
       />


    <View className="h-fit flex-col justify-end flex grow space-y-3">

     <View className="grow"></View>  


     <View className="my-8">
        <TimerComponent duration={15} nextScreen="Failed" navigation={navigation} />
    </View> 

    <View className="grow"></View> 

    <View className="bg-white mx-4 p-4 rounded-xl">
      <Text className="text-neutral-900 text-center text-2xl font-bold">Go to XXXXX location.</Text>
      <Text className="text-neutral-900 text-center text-xs pt-2">Look inside and scan the source before it's too late!</Text>
    </View>

    <BeaconFTB beacons={beaconsData} />

     </View>

  </View>
      

   
  )
}