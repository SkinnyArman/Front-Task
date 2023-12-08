export type Transaction = {
  id: number
  name: string
  date: string
  title: string
  field: 'عنوان' | 'قیمت'
  old_value: string
  new_value: string
}
