import { StyleSheet, View, Platform, Text, ScrollView } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import THEME from '../../theme';
import { Input } from '../Input';
import { Spacer } from '../Spacer';
import {
  InputTextProjectProps,
  PROJECT_TYPES_DEFAULT,
  ProjectTypeProps,
  TECHNOLOGIES_DEFAULT,
  TechnologiesProps,
} from '../../dto/projectsDTO';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  TechnologyTypes,
  getTechnologyColumns,
} from '../../utils/getTechnologyColumns';

type RegisterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  projectType: ProjectTypeProps;
  setProject: Dispatch<SetStateAction<InputTextProjectProps>>;
  setProjectType: Dispatch<SetStateAction<ProjectTypeProps>>;
  setProjectTechnologies: Dispatch<SetStateAction<TechnologiesProps[]>>;
};

const technologies = getTechnologyColumns(TECHNOLOGIES_DEFAULT);
const projectTypes = getTechnologyColumns(PROJECT_TYPES_DEFAULT);

export function RegisterModal({
  onClose,
  isVisible,
  setProject,
  projectType,
  setProjectType,
  setProjectTechnologies,
}: RegisterModalProps) {
  const submitInputButton = Platform.OS === 'ios' ? 'done' : 'send';

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

  function handleAddTechnology(technology: TechnologiesProps) {
    setProjectTechnologies(prevProjectTechnologies =>
      prevProjectTechnologies.includes(technology)
        ? prevProjectTechnologies.filter(item => item !== technology)
        : [...prevProjectTechnologies, technology],
    );
  }

  const renderCheckbox = (item: TechnologyTypes) => {
    if (typeof item === 'string') {
      return (
        <React.Fragment key={item}>
          <BouncyCheckbox
            size={24}
            fillColor={THEME.COLORS.PRIMARY}
            unfillColor={THEME.COLORS.WHITE}
            iconStyle={styles.checkBoxborderColor}
            text={item}
            textStyle={styles.checkBoxTitle}
            innerIconStyle={[
              styles.checkboxBorderWidth,
              styles.checkBoxborderColor,
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
    projectTypes.columns[1].map(renderCheckbox);
  const ProjectTypeRightColumnCheckbox =
    projectTypes.columns[0].map(renderCheckbox);
  const TechnologyLeftColumnCheckbox =
    technologies.columns[1].map(renderCheckbox);
  const TechnologyRightColumnCheckbox =
    technologies.columns[0].map(renderCheckbox);

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      swipeThreshold={200}
      propagateSwipe
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={styles.modal}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.form} onStartShouldSetResponder={() => true}>
            <Input
              label="Nome do projeto:"
              autoCorrect
              autoCapitalize="words"
              placeholder="Discord 2"
              onChangeText={handleUpdateName}
              returnKeyType={submitInputButton}
            />
            <Spacer vertical={24} />
            <Input
              label="Descrição do projeto:"
              autoCorrect
              autoCapitalize="sentences"
              placeholder="Aplicação para criar..."
              onChangeText={handleUpdateDescription}
              returnKeyType={submitInputButton}
            />
            <Spacer vertical={24} />
            <Input
              label="Link do projeto em algum repositório remoto(Github, Gitlab...)"
              autoCorrect={false}
              placeholder="https://github.com/..."
              onChangeText={handleUpdateRemoteRepository}
              returnKeyType={submitInputButton}
            />
            <Spacer vertical={24} />
            <Input
              label="Link do projeto publicado(Vercel, Google Play Store...)"
              autoCorrect={false}
              placeholder=":https://play.google.com/..."
              onChangeText={handleUpdatePublishLink}
              returnKeyType={submitInputButton}
            />
            <Spacer vertical={24} />
            <Text style={styles.title}>Qual é o tipo do projeto?</Text>
            <Spacer vertical={12} />
            <View style={styles.checkboxContainer}>
              <View>{ProjectTypeLeftColumnCheckbox}</View>
              <View>{ProjectTypeRightColumnCheckbox}</View>
            </View>
            <Spacer vertical={24} />
            <Text style={styles.title}>Quais tecnologias foram usadas?</Text>
            <Spacer vertical={12} />
            <View style={styles.checkboxContainer}>
              <View>{TechnologyLeftColumnCheckbox}</View>
              <View>{TechnologyRightColumnCheckbox}</View>
            </View>
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
});
