import { Asset } from 'react-native-image-picker';

import { ProjectImageProps } from '../../dto/imageDTO';

//fizeSize é o tamanho máximo que a imagem pode ter em bytes
/**
 * Formata a imagem para o formato desejado para ser adicionada no Estado de
 * lista de imagens.
 * @param asset - Objeto com informações da imagem, essa tipagem vem do react-
 * native-image-picker
 * @returns - Objeto com a imagem formatada.
 */
function formatImageToState(image: Asset) {
  const { uri, height, width, type, fileName, fileSize, base64 } = image;

  return {
    uri,
    type,
    width,
    height,
    fileName,
    base64,
    fileSize,
  } as ProjectImageProps;
}

export { formatImageToState };
