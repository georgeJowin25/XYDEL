import { CapacitorConfig } from '@capacitor/cli';
import { environment } from './src/environments/environment'; 

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'XYDEL-USER',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: [
      environment.apiBase,
    ]
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
