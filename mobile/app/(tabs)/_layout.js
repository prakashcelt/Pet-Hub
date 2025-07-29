import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import AuthGuard from '../components/AuthGuard';

// Custom tab bar icon component
function TabBarIcon({ name, focused }) {
  const icons = {
    home: '🏠',
    clinics: '🏥',
    explore: '🔍',
    bookmark: '🔖',
    profile: '👤'
  };

  return (
    <View className="items-center justify-center">
      <Text className={`text-2xl ${focused ? 'opacity-100' : 'opacity-60'}`}>
        {icons[name]}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#EA580C', // orange-600
          tabBarInactiveTintColor: '#9CA3AF', // gray-400
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
            height: 90,
            paddingTop: 10,
            paddingBottom: 30,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="clinics"
        options={{
          title: 'Clinics',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="clinics" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="explore" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmark',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="bookmark" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
    </AuthGuard>
  );
}
