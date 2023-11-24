import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionic.ionchat',
  appName: 'Ion Chat',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '557295454798-gk95p09dce563lq6aeq9sjtk6o18igdj.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
