// components/CustomStatusBar.js
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../context/AppContext';

const CustomStatusBar = () => {
  const { settings } = useAppContext();
  
  return (
    <StatusBar style={settings.darkMode ? 'light' : 'dark'} />
  );
};

export default CustomStatusBar;