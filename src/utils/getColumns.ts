import {
  ProjectTypesDefaultProps,
  TechnologiesProps,
} from '../dto/projectsDTO';

export type ColumnsProps = TechnologiesProps | ProjectTypesDefaultProps;

export function getColumns(columns: ColumnsProps[]) {
  if (columns.length === 0) {
    return { columns: [[], []], isEmpty: true };
  }

  if (columns.length === 1) {
    return { columns: [[columns[0]], []], isEmpty: false };
  }

  const middleIndex = Math.floor(columns.length / 2);
  const firstColumn = columns.slice(0, middleIndex);
  const lastColumn = columns.slice(middleIndex);

  return { columns: [firstColumn, lastColumn], isEmpty: false };
}
