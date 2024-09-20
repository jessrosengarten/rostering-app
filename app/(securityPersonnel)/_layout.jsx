// App/SecurityPersonnel/Layout.jsx
import { View, Text, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';

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
                }
            }}
        >
            <Tabs.Screen
                name="securityPersonnelHome"
                options={{
                    title: 'Home',
                    headerShown: false,
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
        </Tabs>
    );
};

export default SecurityPersonnelLayout;
