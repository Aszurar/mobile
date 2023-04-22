import { Asset } from 'react-native-image-picker';

export type ProjectImageProps = Pick<
  Asset,
  'width' | 'height' | 'fileName' | 'fileSize' | 'type' | 'uri' | 'base64'
>;

const PROJECT_IMAGE_DEFAULT: ProjectImageProps = {
  uri: '',
  type: '',
  width: 0,
  height: 0,
  fileName: '',
  fileSize: 0,
  base64: '',
};

const IMAGE_FILE_SIZE_LIMIT = 1000000;
const IMAGE_MINIATURE_SIZE = 90;
const IMAGE_BOX_MINIATURE_SIZE = 112;
const IMAGE_QUANTITY_LIMIT_BY_REGISTER = 1;
const IMAGE_RESOLUTION = {
  height: 720,
  width: 1366,
};

export {
  IMAGE_RESOLUTION,
  IMAGE_FILE_SIZE_LIMIT,
  IMAGE_MINIATURE_SIZE,
  PROJECT_IMAGE_DEFAULT,
  IMAGE_BOX_MINIATURE_SIZE,
  IMAGE_QUANTITY_LIMIT_BY_REGISTER,
};
