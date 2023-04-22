import React, { useEffect, useState } from 'react';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import TrashSVG from '../../assets/icons/trash.svg';

import { SubmitButton } from '../../components/SubmitButton';
import { Spacer } from '../../components/Spacer';
import { RegisterModal } from '../../components/RegisterModal';
import { ProjectCard } from '../../components/ProjectCard';
import { ListEmpty } from '../../components/ListEmpty';
import { ItemSeparator } from '../../components/ItemSeparator';

import {
  INPUT_TEXT_PROJECT_DEFAULT,
  InputTextProjectProps,
  ProjectProps,
  PROJECTS_DEFAULT,
  ProjectTypeProps,
  TechnologiesProps,
} from '../../dto/projectsDTO';
import { PROJECT_IMAGE_DEFAULT, ProjectImageProps } from '../../dto/imageDTO';

import THEME from '../../theme';

const keyExtractor = (item: ProjectProps) => item.id;

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectProps[]>(PROJECTS_DEFAULT);
  const [projectSelected, setProjectSelected] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [project, setProject] = useState<InputTextProjectProps>(
    INPUT_TEXT_PROJECT_DEFAULT,
  );
  const [projectImage, setProjectImage] = useState<ProjectImageProps>(
    PROJECT_IMAGE_DEFAULT,
  );
  const [projectType, setProjectType] = useState<ProjectTypeProps>('other');
  const [projectTechnologies, setProjectTechnologies] = useState<
    TechnologiesProps[]
  >([]);

  const projectQuantity = projects.length;
  const projectSelectedQuantity = projectSelected.length;
  const listEmptyStyle = {
    flex: 1,
    paddingTop: 0,
  };
  const listStyle = {
    flex: 0,
    paddingTop: 12,
  };
  const listDinamicStyle = projectQuantity === 0 ? listEmptyStyle : listStyle;

  const isAllProjectSelected = projectSelected.length === projects.length;

  function openModal() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  const handleSelectProject = (id: string) => {
    const alreadySelected = projectSelected.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = projectSelected.filter(item => item !== id);
      setProjectSelected(filteredItems);
    } else {
      setProjectSelected([...projectSelected, id]);
    }
  };

  const handleToggleSelectAllProject = () => {
    if (isAllProjectSelected) {
      setProjectSelected([]);
    } else {
      const allProjects = projects.map(currentProject => currentProject.id);
      setProjectSelected(allProjects);
    }
  };

  const handleDeleteSelectedProjects = () => {
    if (projectSelectedQuantity === projectQuantity) {
      Alert.alert(
        'Atenção',
        'Você tem certeza que deseja deletar todos os projetos?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => {
              const filteredProjects = projects.filter(
                currentProject => !projectSelected.includes(currentProject.id),
              );
              setProjects(filteredProjects);
              setProjectSelected([]);
            },
          },
        ],
      );
    } else {
      const filteredProjects = projects.filter(
        currentProject => !projectSelected.includes(currentProject.id),
      );
      setProjects(filteredProjects);
      setProjectSelected([]);
    }
  };

  const ProjetCardItemList = ({ item }: { item: ProjectProps }) => {
    return (
      <ProjectCard
        item={item}
        isSelected={projectSelected.includes(item.id)}
        handleSelectProject={handleSelectProject}
        isAllProjectSelected={isAllProjectSelected}
      />
    );
  };

  useEffect(() => {
    console.log('Inputs');
    console.log(project);
    console.log(projectType);
    console.log(projectTechnologies);

    console.log('Todos projetos selecionados? ', isAllProjectSelected);
  }, [project, projectType, projectTechnologies, isAllProjectSelected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus {'\n'}Projetos</Text>
      <Spacer vertical={24} />
      <SubmitButton title="Adicionar" onPress={openModal} />
      <Spacer vertical={12} />

      <View style={styles.listHeader}>
        <Text style={styles.quantitaty}>
          {projectSelectedQuantity}/{projectQuantity}
        </Text>

        <View style={styles.deleteContainer}>
          {projectSelected.length > 0 && (
            <TouchableOpacity
              onPress={handleDeleteSelectedProjects}
              style={styles.deleteContainerSpacer}>
              <TrashSVG width={28} height={28} />
            </TouchableOpacity>
          )}

          {projectQuantity > 0 && (
            <View style={styles.checkBoxContainer}>
              <Text style={styles.subtitle}>Selecionar todos</Text>
              <BouncyCheckbox
                size={24}
                fillColor={THEME.COLORS.PRIMARY}
                unfillColor={THEME.COLORS.WHITE}
                disableText
                iconStyle={styles.checkBoxborderColor}
                disableBuiltInState
                isChecked={isAllProjectSelected}
                textStyle={styles.subtitle}
                innerIconStyle={[
                  styles.checkboxBorderWidth,
                  styles.checkBoxborderColor,
                ]}
                style={[styles.deleteContainerSpacer, styles.checkBoxStyle]}
                onPress={handleToggleSelectAllProject}
              />
            </View>
          )}
        </View>
      </View>
      <Spacer vertical={24} />
      <FlatList
        data={projects}
        keyExtractor={keyExtractor}
        renderItem={ProjetCardItemList}
        ListEmptyComponent={ListEmpty}
        ItemSeparatorComponent={ItemSeparator}
        refreshControl={
          <RefreshControl
            colors={[THEME.COLORS.PRIMARY]}
            refreshing={isLoading}
            onRefresh={() => console.log('Sorvete')}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.list, listDinamicStyle]}
      />

      <RegisterModal
        project={project}
        isVisible={isModalVisible}
        onClose={closeModal}
        projectTechnologies={projectTechnologies}
        setProject={setProject}
        projectType={projectType}
        projectImage={projectImage}
        setProjectImage={setProjectImage}
        setProjectType={setProjectType}
        setProjectTechnologies={setProjectTechnologies}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.PRIMARY,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: THEME.COLORS.WHITE,
  },
  quantitaty: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.COLORS.WHITE,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.COLORS.WHITE,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    marginTop: 20,
    fontSize: 18,
    borderRadius: 12,
    color: THEME.COLORS.BLACK,
    backgroundColor: THEME.COLORS.WHITE,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteContainerSpacer: {
    marginRight: 24,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxborderColor: {
    borderColor: THEME.COLORS.WHITE,
    borderRadius: 6,
  },
  checkboxBorderWidth: {
    borderWidth: 2,
  },
  checkBoxStyle: {
    marginLeft: 12,
    marginRight: 0,
  },
  list: {
    paddingTop: 12,
    paddingBottom: 12,
  },
});
