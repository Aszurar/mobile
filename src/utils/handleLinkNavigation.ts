import { Alert, Linking } from 'react-native';

async function handleLinkNavigation(url: string) {
  try {
    await Linking.openURL(url);
    console.log(
      '🚀 ~ file: handleLinkNavigation.ts ~ line 6 ~ handleLinkNavigation ~ Abrindo endereço-urk',
      url,
    );
  } catch (err) {
    Alert.alert('Error', 'Falha ao abrir link');
  }
}

export default handleLinkNavigation;
