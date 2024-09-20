import { Image, View, Text } from 'react-native';
import { Tabs, } from 'expo-router';
import { icons, images } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor="#E21A1A"
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#E21A1A",
          tabBarInactiveTintColor: "#000000",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#E0E0E0",
            borderTopWidth: 1,
            height: 90,
          },
        }}
      >
        <Tabs.Screen
          name="securityAdminHome"
          options={{
            title: "Home",
            headerShown: false,
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
            headerShown: false,
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
            headerShown: false,
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
      </Tabs>
    </>
  );
};

export default TabLayout;