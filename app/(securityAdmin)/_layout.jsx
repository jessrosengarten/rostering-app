import { Image, View, Text } from 'react-native';
import { Tabs, useLocalSearchParams } from 'expo-router'
import { icons, images } from "../../constants";
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
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs w-16 text-center`}>
        {name}
      </Text>
    </View>
  );
};

const SecurityAdminLayout = () => {
  const { adminName } = useLocalSearchParams(); //Sets adminName when user logs in
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
          paddingTop: 15,
        },
        header: () => <CustomHeader username={adminName} userPhoto={userPhoto} settingsNav={{ name: 'settingsPage', params: { adminName } }} />, // Use the custom header component
      }}
    >
      <Tabs.Screen
        name="securityAdminHome"
        options={{
          title: "Home",
          headerShown: true,
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

      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.schedule}
              color={color}
              name="Schedule"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="finance"
        options={{
          title: "Finance",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Finance"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="assignPersonnelManagement"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="clubDetails"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="clubManagerDetails"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="securityPersonnelProfile"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="settingsPage"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="assignSpecificPersonnel"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="changePassword"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="clubPayments"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="clubSpecificSchedule"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="securityPersonnelPayments"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="securityPersonnelDocuments"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="dataAnalytics"
        options={{
          title: '',
          headerShown: true,
          href: null,
        }}
      />
    </Tabs>
  );
};

export default SecurityAdminLayout;