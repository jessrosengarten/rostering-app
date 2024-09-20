import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Tabs, Redirect, useNavigation } from 'expo-router'
import { icons, images } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>
                {name}
            </Text>

        </View>
    )
}

const ClubManagerLayout = () => {
    const navigation = useNavigation();
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#E21A1A',
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarStyle: {
                        backgroundColor: '#E0E0E0',
                        borderTopWidth: 1,
                        borderTopColor: '#d3d3d3',
                        borderBottomWidth: 1,
                        borderBottomColor: '#d3d3d3',
                        height: 90,
                    },
                }}
            >
                <Tabs.Screen
                    name="clubManagerHome"
                    options={{
                        title: 'Jason',
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#E0E0E0',
                            borderBottomColor: '#d3d3d3',
                            borderBottomWidth: 1,
                            elevation: 0, // Remove the default elevation
                            shadowOpacity: 0, // Remove the default shadow
                        },
                        headerTitleStyle: {
                            fontSize: 18, // Customize the title font size
                            fontWeight: 'bold', // Customize the title font weight
                        },
                        headerLeft: () => (
                            <View className="flex flex-row items-center">
                                <TouchableOpacity onPress={() => navigation.navigate('index')}>
                                    <View className="ml-5 w-9 h-9 rounded-full bg-white overflow-hidden mr-5 justify-center items-center" style={{ borderWidth: 2, borderColor: '#a9a9a9' }}>
                                        <Image
                                            source={icons.user}
                                            resizeMode="contain"
                                            className="h-6 w-6"
                                            tintColor={'#E21A1A'}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ),
                        headerRight: () => (
                            <View className="flex flex-row items-center">
                                <TouchableOpacity onPress={() => navigation.navigate('index')}>
                                    <Image
                                        source={icons.notification}
                                        resizeMode="contain"
                                        className="w-6 h-6 mr-5"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('index')}>
                                    <Image
                                        source={icons.settings}
                                        resizeMode="contain"
                                        className="w-6 h-6 mr-5"
                                    />
                                </TouchableOpacity>
                            </View>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs >
        </>
    );
};

export default ClubManagerLayout