import React from 'react';

import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Alert, Linking, Platform } from 'react-native';

import ImageFileSVG from '../../assets/icons/file-image.svg';

import {
  IMAGE_FILE_SIZE_LIMIT,
  IMAGE_QUANTITY_LIMIT_BY_REGISTER,
  IMAGE_RESOLUTION,
  ProjectImageProps,
} from '../../dto/imageDTO';

import { IconNativeButton } from '../IconNativeButton';
import { formatImageToState } from './utils';

interface ImagePickerButtonProps {
  setProjectImage: (images: ProjectImageProps) => void;
  setImagesSelectedError: (errorMessage: string) => void;
}

export function ImagePickerButton({
  setProjectImage,
  setImagesSelectedError,
}: ImagePickerButtonProps) {
  /**
   *Solicita permissão ao usuário para acessar a galeria de imagens do dispositivo.
   *@returns {Promise<boolean>} Retorna uma Promise que resolve em true se a
   *permissão foi concedida e false se foi negada.
   *Em caso de erro, a função exibe um alerta de erro e retorna false.
   */
  async function handleGalleryPermissionsRequest(): Promise<boolean> {
    try {
      let permissionStatus: PermissionStatus;
      if (Platform.OS === 'ios') {
        permissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (permissionStatus === 'denied') {
          permissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        }
      } else {
        permissionStatus = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (permissionStatus === 'denied') {
          permissionStatus = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );
        }
      }

      if (permissionStatus === RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          'Permissão de acesso a galeria negada',
          'Para adicionar imagens, é necessário permitir o acesso a galeria do dispositivo.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Ir para configurações',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return false;
      }
    } catch (error) {
      Alert.alert(
        'Erro ao solicitar permissão de acesso a galeria',
        'Ocorreu um erro ao solicitar permissão de acesso a galeria do dispositivo.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Ir para configurações',
            onPress: () => Linking.openSettings(),
          },
        ],
      );
      return false;
    }
  }

  async function handleSelectImageByGallery() {
    const permissionGranted = await handleGalleryPermissionsRequest();
    if (!permissionGranted) {
      return;
    }

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: IMAGE_RESOLUTION.width,
      maxHeight: IMAGE_RESOLUTION.height,
      selectionLimit: IMAGE_QUANTITY_LIMIT_BY_REGISTER,
      includeBase64: true,
    };

    try {
      const response = await launchImageLibrary(options);
      console.log('========Imagens selecionadas pela galeria========');
      console.log(response);
      if (response.didCancel) {
        return;
      }

      if (response.assets) {
        if (response.assets.length > IMAGE_QUANTITY_LIMIT_BY_REGISTER) {
          Alert.alert(
            'Limite de imagens excedido',
            `Você pode selecionar apenas ${IMAGE_QUANTITY_LIMIT_BY_REGISTER} 
            imagem. 
          Apenas a primeira imagem será adicionada.`,
          );
        }
        const formattedImages = formatImageToState(response.assets[0]);

        if (formattedImages.fileSize! > IMAGE_FILE_SIZE_LIMIT) {
          console.log('========Tamanho da imagem excedido========');
          console.log(formattedImages.fileSize);
          Alert.alert(
            'Tamanho da imagem excedido',
            `O tamanho da imagem selecionada ultrapassa o máximo permitido de 
            ${IMAGE_FILE_SIZE_LIMIT} mb. Por favor, escolha uma imagem mais leve.`,
          );
          return;
        }

        setProjectImage(formattedImages);
        setImagesSelectedError('');
      }
    } catch (error) {
      Alert.alert(
        'Erro ao selecionar imagens',
        'Ocorreu um erro ao selecionar imagens. Por favor, tente novamente.',
      );
    }
  }

  return (
    <IconNativeButton
      onPress={handleSelectImageByGallery}
      icon={ImageFileSVG}
    />
  );
}
