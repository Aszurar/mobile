import { Alert, Linking } from 'react-native';

/**
* Função assíncrona que recebe uma URL como parâmetro e tenta abrir a página correspondente utilizando
* o módulo Linking do React Native. 
* Caso ocorra algum erro na tentativa de abertura da URL,
* a função exibe um alerta indicando que houve uma falha na operação.
* @param url | string - URL que será aberta.
* @returns | Promise<void> - Retorna uma Promise que não possui nenhum valor de retorno.
**/
async function handleLinkNavigation(url: string) {
  try {
    await Linking.openURL(url);
  } catch (err) {
    Alert.alert('Error', 'Falha ao abrir link');
  }
}

export default handleLinkNavigation;
