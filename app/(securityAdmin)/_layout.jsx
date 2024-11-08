import { Image, View, Text } from 'react-native';
import { Tabs, } from 'expo-router';
import { icons, images } from "../../constants";
import CustomHeader from '../../components/CustomHeader'
import { useRoute } from '@react-navigation/native';


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

const SecurityAdminLayout = () => {
  //const username = "Clarence"; // Replace with the actual username
  const route = useRoute();
  //Sets adminName when user logs in
  const { adminName } = route.params || {};
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
        header: () => <CustomHeader username={adminName} userPhoto={userPhoto} settingsNav={"settingsPage"} notificationNav={"index"} photoNav={"index"} />, // Use the custom header component
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
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="clubDetails"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="clubManagerDetails"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="clubManagerUser"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="securityPersonnelProfile"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
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
      <Tabs.Screen
        name="assignSpecificPersonnel"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="changePassword"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="clubPayments"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="clubSpecificSchedule"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="securityPersonnelPayments"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="securityPersonnelDocuments"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="dataAnalytics"
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null, // This hides the tab
        }}
      />
    </Tabs>
  );
};

export default SecurityAdminLayout;