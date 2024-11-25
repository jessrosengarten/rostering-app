import { Link, useRouter } from 'expo-router';
import { View, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'

export default function App() {
    const router = useRouter();
    const isDarkMode = router.params?.isDarkMode || false; // Get Dark Mode state
    return (
        <SafeAreaView edges={[]}>

            <ImageBackground
                source={isDarkMode ? images.darkmodeBackgroundImage : images.background}
                style={{ height: '100%', width: '100%' }}
            >
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <View className="flex-1 items-center justify-center">
                        <Image
                            source={images.naraLogo}
                            className="w-60 h-60"
                            resizeMode="contain"
                            style={{ borderRadius: 30 }}
                        />
                        <CustomButton
                            title="Login"
                            handlePress={() => { router.push('/sign-in') }}
                            containerStyles="w-3/4 mt-40"
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

