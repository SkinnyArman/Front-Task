import { FiltersEnum, SortFilterEnum } from '@/enums/FiltersEnum'
export type Filter = {
  [FiltersEnum.Sort]?: SortFilterEnum
  [FiltersEnum.Name]?: string
  [FiltersEnum.Title]?: string
  [FiltersEnum.StartDate]?: string
  [FiltersEnum.EndDate]?: string
  [FiltersEnum.Page]?: number
}
