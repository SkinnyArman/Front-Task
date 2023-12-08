import { FiltersEnum, SortFilterEnum } from '@/enums/FiltersEnum'
export type Filter = {
  [key in FiltersEnum]?: key extends FiltersEnum.Sort
    ? SortFilterEnum
    : key extends FiltersEnum.Page
      ? number
      : string
}
