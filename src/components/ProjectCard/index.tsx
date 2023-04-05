import React, { useEffect, useState } from 'react';
import { SvgProps } from 'react-native-svg';
import {
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler';

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FileCodeSVG from '../../assets/icons/file-code.svg';
import GithubSVG from '../../assets/icons/github-logo.svg';

import { ProjectProps } from '../../dto/projectsDTO';

import THEME from '../../theme';

import selectTechnologyIcon from '../../utils/selectTechnologyIcon';
import { selectProjectTypeIcon } from '../../utils/selectProjectTypeIcon';
import handleLinkNavigation from '../../utils/handleLinkNavigation';

type ProjectCardProps = {
  item: ProjectProps;
  isSelected: boolean;
  handleSelectProject: (id: string) => void;
  isAllProjectSelected: boolean;
};

type TechnologiesIconListProps = {
  id: string;
  Icon: React.FC<SvgProps>;
};

const keyExtractor = (item: TechnologiesIconListProps) => item.id;
const ItemSeparator = () => <View style={styles.ItemSeparator} />;

const projectCardSelectedStyle = {
  backgroundColor: THEME.COLORS.PRIMARY_TRANSLUCENT,
  borderWidth: 1,
  borderColor: THEME.COLORS.PRIMARY,
};

const projectCardDefaultStyle = {
  backgroundColor: THEME.COLORS.WHITE,
  borderWidth: 0,
};

export function ProjectCard({
  item,
  isSelected,
  handleSelectProject,
  isAllProjectSelected,
}: ProjectCardProps) {
  const {
    id,
    name,
    description,
    type,
    image,
    technologies,
    remoteRepository,
    publishLink,
  } = item;

  const [isLongPressed, setIsLongPressed] = useState(false);

  const projectCardIsLongPressedStyle = isSelected
    ? projectCardSelectedStyle
    : projectCardDefaultStyle;

  function handleLongPress() {
    setIsLongPressed(!isLongPressed);
    handleSelectProject(id);
  }

  const ProjectTypeIcon = selectProjectTypeIcon(type);
  const techtechnologiesIconsList = technologies.map(technology => {
    const Icon = selectTechnologyIcon(technology);
    const iconId = technology;
    return { id: iconId, Icon } as TechnologiesIconListProps;
  });

  const ItemList = ({ item: Item }: { item: TechnologiesIconListProps }) => {
    return <Item.Icon width={20} height={20} />;
  };

  function handleNavigateToremoteRepository() {
    handleLinkNavigation(remoteRepository);
  }

  function handleNavigateToProject() {
    handleLinkNavigation(publishLink);
  }

  useEffect(() => {
    console.log("isLongPressed", isLongPressed);
  }, [isLongPressed]);

  return (
    <View style={styles.container}>
      <View style={[styles.subcontainer, projectCardIsLongPressedStyle]}>
        <GestureHandlerRootView style={styles.gesturehandle}>
          <RectButton
            style={styles.rectbutton}
            onPress={handleNavigateToProject}
            onLongPress={handleLongPress}>
            {image ? (
              <Image
                source={{
                  uri: image,
                }}
                style={styles.projetImage}
              />
            ) : (
              <FileCodeSVG width={48} height={48} />
            )}
            <View style={styles.textContainer}>
              <View style={styles.nameContainer}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {name}
                </Text>
                <ProjectTypeIcon width={20} height={20} />
              </View>
              <Text
                style={styles.description}
                numberOfLines={3}
                ellipsizeMode="tail">
                {description}
              </Text>

              <FlatList
                horizontal
                style={styles.technologiesContainerList}
                showsHorizontalScrollIndicator={false}
                data={techtechnologiesIconsList}
                keyExtractor={keyExtractor}
                renderItem={ItemList}
                ItemSeparatorComponent={ItemSeparator}
              />
            </View>
          </RectButton>
        </GestureHandlerRootView>

        <TouchableOpacity
          style={styles.remoteRepositoryButton}
          onPress={handleNavigateToremoteRepository}>
          <GithubSVG width={40} height={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 120,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 12,
    padding: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subcontainer: {
    flex: 1,
    borderRadius: 12,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  checkContainer: {
    position: 'absolute',
    // flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gesturehandle: {
    flex: 1,
  },
  rectbutton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 8,
  },
  projetImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: THEME.COLORS.BLACK,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  technologiesContainerList: {
    width: '100%',
    flexGrow: 0,
  },

  ItemSeparator: {
    width: 8,
  },
  remoteRepositoryButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
});
