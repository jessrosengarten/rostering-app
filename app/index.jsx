import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { useRoute } from '@react-navigation/native'

export default function App() {
    const route = useRoute();
    const isDarkMode = route.params?.isDarkMode || false; // Get Dark Mode state
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
                        <CustomButton
                            title="Register"
                            handlePress={() => { router.push('/sign-up') }}
                            containerStyles="w-3/4 mt-4"
                        />
                        <Link href={"/clubManagerHome"} className="text-lg font-psemibold text-sky-500 mt-2">Club Manager Home</Link>
                        <Link href={"/securityAdminHome"} className="text-lg font-psemibold text-sky-500 mt-2">Security admin Home</Link>
                        <Link href={"/securityPersonnelHome"} className="text-lg font-psemibold text-sky-500 mt-2">Personnel Home</Link>
                        <Link href={"/settingsPage"} className="text-lg font-psemibold text-sky-500 mt-2">Settings</Link>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

