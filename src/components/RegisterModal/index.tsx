import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ColumnsProps, getColumns } from '../../utils/getColumns';

import {
  INPUT_TEXT_PROJECT_DEFAULT,
  InputTextProjectProps,
  PROJECT_ERROR_MESSAGES_DEFAULT,
  PROJECT_TYPES_DEFAULT,
  ProjectErrorMessagesProps,
  ProjectTypeProps,
  TECHNOLOGIES_DEFAULT,
  TechnologiesProps,
} from '../../dto/projectsDTO';
import { PROJECT_IMAGE_DEFAULT, ProjectImageProps } from '../../dto/imageDTO';

import { SubmitButton } from '../SubmitButton';
import { Spacer } from '../Spacer';
import { Input } from '../Input';
import { ImagePlaceHolder } from '../ImagePlaceHolder';
import { ImagePickerButton } from '../ImagePickerButton';
import THEME from '../../theme';

type RegisterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  project: InputTextProjectProps;
  projectType: ProjectTypeProps;
  projectImage: ProjectImageProps;
  projectTechnologies: TechnologiesProps[];
  setProjectType: Dispatch<SetStateAction<ProjectTypeProps>>;
  setProject: Dispatch<SetStateAction<InputTextProjectProps>>;
  setProjectImage: (images: ProjectImageProps) => void;
  setProjectTechnologies: Dispatch<SetStateAction<TechnologiesProps[]>>;
};

const technologiesColumns = getColumns(TECHNOLOGIES_DEFAULT);
const projectTypesColumns = getColumns(PROJECT_TYPES_DEFAULT);

export function RegisterModal({
  onClose,
  isVisible,
  setProject,
  project,
  projectType,
  projectTechnologies,
  projectImage,
  setProjectType,
  setProjectImage,
  setProjectTechnologies,
}: RegisterModalProps) {
  const submitInputButton = Platform.OS === 'ios' ? 'done' : 'send';

  const projectNameInputRef = useRef<TextInput>(null);
  const projectDescriptionInputRef = useRef<TextInput>(null);
  const projectRemoteRepositoryInputRef = useRef<TextInput>(null);
  const projectPublishLinkInputRef = useRef<TextInput>(null);

  const [projectErrorsMessages, setProjectErrorsMessages] =
    useState<ProjectErrorMessagesProps>(PROJECT_ERROR_MESSAGES_DEFAULT);

  function handleUpdateName(name: string) {
    setProject(prevProject => ({ ...prevProject, name }));
  }
  function handleUpdateDescription(description: string) {
    setProject(prevProject => ({ ...prevProject, description }));
  }
  function handleUpdateRemoteRepository(remoteRepository: string) {
    setProject(prevProject => ({ ...prevProject, remoteRepository }));
  }
  function handleUpdatePublishLink(publishLink: string) {
    setProject(prevProject => ({ ...prevProject, publishLink }));
  }

  function handleSelectProjectType(type: ProjectTypeProps) {
    setProjectType(type);
  }
  function handleOnClose() {
    setProjectErrorsMessages(PROJECT_ERROR_MESSAGES_DEFAULT);
    onClose();
  }

  function handleAddTechnology(technology: TechnologiesProps) {
    setProjectTechnologies(prevProjectTechnologies =>
      prevProjectTechnologies.includes(technology)
        ? prevProjectTechnologies.filter(item => item !== technology)
        : [...prevProjectTechnologies, technology],
    );
  }

  const renderCheckbox = (item: ColumnsProps) => {
    if (typeof item === 'string') {
      return (
        <React.Fragment key={item}>
          <BouncyCheckbox
            size={24}
            fillColor={THEME.COLORS.PRIMARY}
            unfillColor={THEME.COLORS.WHITE}
            iconStyle={styles.checkBoxRoundSquareBorder}
            text={item}
            textStyle={styles.checkBoxTitle}
            innerIconStyle={[
              styles.checkboxBorderWidth,
              styles.checkBoxRoundSquareBorder,
            ]}
            style={[styles.deleteContainerSpacer, styles.checkBoxStyle]}
            onPress={() => handleAddTechnology(item)}
          />
          <Spacer vertical={6} />
        </React.Fragment>
      );
    } else {
      const isChecked = item.value === projectType;
      return (
        <React.Fragment key={item.value}>
          <BouncyCheckbox
            size={24}
            fillColor={THEME.COLORS.PRIMARY}
            unfillColor={THEME.COLORS.WHITE}
            disableBuiltInState
            iconStyle={styles.checkBoxborderColor}
            text={item.label}
            isChecked={isChecked}
            textStyle={styles.checkBoxTitle}
            innerIconStyle={[
              styles.checkboxBorderWidth,
              styles.checkBoxborderColor,
            ]}
            style={[styles.deleteContainerSpacer, styles.checkBoxStyle]}
            onPress={() =>
              handleSelectProjectType(item.value as ProjectTypeProps)
            }
          />
          <Spacer vertical={6} />
        </React.Fragment>
      );
    }
  };

  const ProjectTypeLeftColumnCheckbox =
    projectTypesColumns.columns[1].map(renderCheckbox);
  const ProjectTypeRightColumnCheckbox =
    projectTypesColumns.columns[0].map(renderCheckbox);
  const TechnologyLeftColumnCheckbox =
    technologiesColumns.columns[1].map(renderCheckbox);
  const TechnologyRightColumnCheckbox =
    technologiesColumns.columns[0].map(renderCheckbox);

  function handleSubmit() {
    let error = 0;
    if (project.name === '') {
      setProjectErrorsMessages(prevProjectErrorsMessages => ({
        ...prevProjectErrorsMessages,
        name: 'É necessário informar um nome para o projeto.',
      }));
      error++;
    }
    if (project.description === '') {
      setProjectErrorsMessages(prevProjectErrorsMessages => ({
        ...prevProjectErrorsMessages,
        description: 'É necessário informar uma descrição para o projeto.',
      }));
      error++;
    }
    if (project.remoteRepository === '') {
      setProjectErrorsMessages(prevProjectErrorsMessages => ({
        ...prevProjectErrorsMessages,
        remoteRepository:
          'É necessário informar um repositório remoto para o projeto.',
      }));
      error++;
    }
    if (projectTechnologies.length === 0) {
      setProjectErrorsMessages(prevProjectErrorsMessages => ({
        ...prevProjectErrorsMessages,
        technologies:
          'É necessário informar pelo menos uma tecnologia para o projeto.',
      }));
      error++;
    }
    if (projectType === 'other') {
      setProjectErrorsMessages(prevProjectErrorsMessages => ({
        ...prevProjectErrorsMessages,
        type: 'É necessário informar qual é o tipo para o projeto.',
      }));
      error++;
    }

    if (error > 0) {
      console.log('Erro ao cadastrar projeto');
      Alert.alert('Ops!', 'Preencha todos os campos obrigatórios');
      return;
    }

    console.log('========= Dados do projeto =========');
    console.log('Nome: ', project.name);
    console.log('Descrição: ', project.description);
    console.log('Repositório remoto: ', project.remoteRepository);
    console.log('Link de publicação: ', project.publishLink);
    console.log('Tecnologias: ', projectTechnologies);
    console.log('Tipo do projeto: ', projectType);
    console.log('Imagem: ', projectImage);
    console.log('====================================');

    setProject(INPUT_TEXT_PROJECT_DEFAULT);
    setProjectImage(PROJECT_IMAGE_DEFAULT);
    setProjectType('other');
    setProjectTechnologies([]);
    error = 0;
    handleOnClose();
  }

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={handleOnClose}
      swipeThreshold={200}
      propagateSwipe
      onSwipeComplete={handleOnClose}
      swipeDirection={['down']}
      style={styles.modal}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.form} onStartShouldSetResponder={() => true}>
            <View>
              <Text>Selecione um imagem para o projeto:</Text>
              <View style={styles.imageInputContainer}>
                <ImagePickerButton setProjectImage={setProjectImage} />
                {projectImage.uri ? (
                  <Image
                    style={styles.imageProject}
                    accessibilityLabel="Imagem do documento selecionada"
                    source={{ uri: projectImage.uri }}
                  />
                ) : (
                  <ImagePlaceHolder />
                )}
              </View>
            </View>
            <Spacer vertical={24} />
            <Input
              value={project.name}
              inputRef={projectNameInputRef}
              label="Nome do projeto"
              autoCorrect
              autoCapitalize="words"
              placeholder="Discord 2"
              onChangeText={handleUpdateName}
              returnKeyType={submitInputButton}
              errorMessage={projectErrorsMessages.name}
              onSubmitEditing={() => {
                projectNameInputRef.current?.blur();
                projectDescriptionInputRef.current?.focus();
              }}
            />
            <Spacer vertical={24} />
            <Input
              value={project.description}
              multiline
              height={100}
              numberOfLines={4}
              maxLength={150}
              style={styles.textArea}
              inputRef={projectDescriptionInputRef}
              label="Descrição do projeto"
              autoCorrect
              autoCapitalize="sentences"
              placeholder="Aplicação para criar..."
              onChangeText={handleUpdateDescription}
              returnKeyType={submitInputButton}
              errorMessage={projectErrorsMessages.description}
            />
            <Spacer vertical={24} />
            <Input
              value={project.remoteRepository}
              inputRef={projectRemoteRepositoryInputRef}
              label="Link do projeto em algum repositório remoto(Github, GitLab...)"
              autoCorrect={false}
              placeholder="https://github.com/..."
              onChangeText={handleUpdateRemoteRepository}
              returnKeyType={submitInputButton}
              errorMessage={projectErrorsMessages.remoteRepository}
              onSubmitEditing={() => {
                projectPublishLinkInputRef.current?.focus();
              }}
            />
            <Spacer vertical={24} />
            <Input
              value={project.publishLink}
              isOptional
              inputRef={projectPublishLinkInputRef}
              label="Link do projeto publicado(Vercel, Google Play Store...)"
              autoCorrect={false}
              placeholder=":https://play.google.com/..."
              onChangeText={handleUpdatePublishLink}
              returnKeyType={submitInputButton}
              onSubmitEditing={() => {
                projectPublishLinkInputRef.current?.blur();
              }}
            />
            <Spacer vertical={24} />
            <View>
              <Text style={styles.title}>
                Qual é o tipo do projeto?
                <Text style={styles.isRequired}>*</Text>
              </Text>
              <Spacer vertical={12} />
              <View style={styles.checkboxContainer}>
                <View>{ProjectTypeLeftColumnCheckbox}</View>
                <View>{ProjectTypeRightColumnCheckbox}</View>
              </View>
              {projectErrorsMessages.type !== '' && projectType === 'other' && (
                <>
                  <View style={styles.errorBorder} />
                  <Text style={styles.errorMessage}>
                    {projectErrorsMessages.type}
                  </Text>
                </>
              )}
            </View>
            <Spacer vertical={24} />
            <View>
              <Text style={styles.title}>
                Quais tecnologias foram usadas?
                <Text style={styles.isRequired}>*</Text>
              </Text>
              <Spacer vertical={12} />
              <View style={styles.checkboxContainer}>
                <View>{TechnologyLeftColumnCheckbox}</View>
                <View>{TechnologyRightColumnCheckbox}</View>
              </View>
              {projectErrorsMessages.technologies !== '' &&
                projectTechnologies.length === 0 && (
                  <>
                    <View style={styles.errorBorder} />
                    <Text style={styles.errorMessage}>
                      {projectErrorsMessages.technologies}
                    </Text>
                  </>
                )}
            </View>

            <Spacer vertical={12} />
            <Text style={styles.textObligatory}>
              Todos campos com o símbolo * são obrigatórios
            </Text>
            <Spacer vertical={12} />
            <SubmitButton
              title="Salvar"
              type="primary"
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 12,
  },
  container: {
    height: '70%',
    width: '100%',
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 32,
  },
  imageInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
  },
  isRequired: {
    color: THEME.COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 12,
    color: THEME.COLORS.DELETE,
  },
  errorBorder: {
    height: 0.5,
    width: '100%',
    margin: 8,
    backgroundColor: THEME.COLORS.DELETE,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteContainerSpacer: {
    marginRight: 20,
  },
  title: {
    fontSize: 16,
  },
  imageProject: {
    width: 90,
    height: 90,
    padding: 10,
    borderRadius: 12,
    backgroundColor: THEME.COLORS.PRIMARY_TRANSLUCENT,
    borderWidth: 1,
    borderColor: THEME.COLORS.PRIMARY,
  },
  checkBoxRoundSquareBorder: {
    borderRadius: 6,
    borderColor: THEME.COLORS.PRIMARY,
  },
  checkBoxborderColor: {
    borderColor: THEME.COLORS.PRIMARY,
  },
  checkboxBorderWidth: {
    borderWidth: 2,
  },
  checkBoxStyle: {
    marginRight: 0,
  },
  checkBoxTitle: {
    fontSize: 14,
    textDecorationLine: 'none',
  },
  textObligatory: {
    color: THEME.COLORS.PRIMARY,
    fontSize: 12,
    textAlign: 'center',
  },
});
