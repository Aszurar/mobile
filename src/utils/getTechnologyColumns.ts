import {
  ProjectTypesDefaultProps,
  TechnologiesProps,
} from '../dto/projectsDTO';
export type TechnologyTypes = TechnologiesProps | ProjectTypesDefaultProps;

export function getTechnologyColumns(technologies: TechnologyTypes[]) {
  if (technologies.length === 0) {
    return { columns: [[], []], isEmpty: true };
  }

  if (technologies.length === 1) {
    return { columns: [[technologies[0]], []], isEmpty: false };
  }

  const middleIndex = Math.floor(technologies.length / 2);
  const firstTechnologies = technologies.slice(0, middleIndex);
  const lastTechnologies = technologies.slice(middleIndex);

  return { columns: [firstTechnologies, lastTechnologies], isEmpty: false };
}
