import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import { ListEmpty } from '../../components/ListEmpty';
import { ProjectCard } from '../../components/ProjectCard';
import { ItemSeparator } from '../../components/ItemSeparator';

import TrashSVG from '../../assets/icons/trash.svg';

import {
  INPUTTEXT_PROJECT_DEFAULT,
  InputTextProjectProps,
  PROJECTS_DEFAULT,
  ProjectProps,
  ProjectTypeProps,
  TechnologiesProps,
} from '../../dto/projectsDTO';

import THEME from '../../theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SubmitButton } from '../../components/SubmitButton';
import { Spacer } from '../../components/Spacer';
import { RegisterModal } from '../../components/RegisterModal';

const keyExtractor = (item: ProjectProps) => item.id;

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectProps[]>(PROJECTS_DEFAULT);
  const [projectSelected, setProjectSelected] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [project, setProject] = useState<InputTextProjectProps>(
    INPUTTEXT_PROJECT_DEFAULT,
  );
  const [projectType, setProjectType] = useState<ProjectTypeProps>("other");
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
              const filteredProjects = projects.filter(currentProject => !projectSelected.includes(currentProject.id));
              setProjects(filteredProjects);
              setProjectSelected([]);

            },
          },
        ],
      );
    } else {
      const filteredProjects = projects.filter(currentProject => !projectSelected.includes(currentProject.id));
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

    console.log("Todos projetos selecionados? ", isAllProjectSelected);
  }, [project, projectType, projectTechnologies, isAllProjectSelected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus {'\n'}Projetos</Text>
      <Spacer vertical={24} />
      <SubmitButton title="Adicionar" onPress={openModal} />
      <Spacer vertical={12} />

      <View style={styles.listHeader}>
        <Text style={styles.title}>{projectQuantity}</Text>

        <View style={styles.deleteContainer}>
          {projectSelected.length > 0 && (
            <TouchableOpacity
              onPress={handleDeleteSelectedProjects}
              style={styles.deleteContainerSpacer}>
              <TrashSVG width={28} height={28} />
            </TouchableOpacity>
          )}

          {projectSelectedQuantity > 0 && (
            <Text style={styles.subtitle}>{projectSelectedQuantity}</Text>
          )}
          {projectQuantity > 0 && (
            <BouncyCheckbox
              size={24}
              fillColor={THEME.COLORS.PRIMARY}
              unfillColor={THEME.COLORS.WHITE}
              iconStyle={styles.checkBoxborderColor}
              text="Selecionar todos"
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
        isVisible={isModalVisible}
        onClose={closeModal}
        setProject={setProject}
        projectType={projectType}
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
    marginRight: 20,
  },
  checkBoxborderColor: {
    borderColor: THEME.COLORS.WHITE,
  },
  checkboxBorderWidth: {
    borderWidth: 2,
  },
  checkBoxStyle: {
    marginLeft: 24,
    marginRight: 0,
  },
  list: {
    paddingTop: 12,
    paddingBottom: 12,
  },
});
