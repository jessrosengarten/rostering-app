// App/SecurityPersonnel/Layout.jsx
import { View, Text, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { icons, images } from '../../constants';
import CustomHeader from '../../components/CustomHeader'

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
    );
};

const SecurityPersonnelLayout = () => {
    const username = "Jason"; // Replace with the actual username
    const userPhoto = images.naraLogo; // Replace with the actual user photo URL
    return (
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

                header: () => <CustomHeader username={username} userPhoto={userPhoto} settingsNav={"settingsPage"} notificationNav={"index"} photoNav={"index"}  />, // Use the custom header component
            }}
        >
            <Tabs.Screen
                name="securityPersonnelHome"
                options={{
                    title: 'Home',
                    headerShown: true,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="securityPersonnelFinances"
                options={{
                    title: 'Finances',
                    headerShown: true,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.bookmark}
                            color={color}
                            name="Finances"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="securityPersonnelEarningHistory"
                options={{
                    title: '',
                    headerShown: true,
                    //tabBarButton: () => null, // This hides the tab
                }}
            />
            <Tabs.Screen
                name="settingsPage"
                options={{
                    title: '',
                    headerShown: true,
                    tabBarButton: () => null, // This hides the tab
                }}
            />
        </Tabs>
    );
};

export default SecurityPersonnelLayout;
