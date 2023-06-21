type TSortTypes = 'asc' | 'desc' | null;

export interface IHeader<T> {
  text: string
  value: keyof T | Omit<string, keyof T>
  sort?: TSortTypes
  classes?: string
  itemClasses?: string
  formatAsDate?: boolean
  align?: 'left' | 'center' | 'right'
}

export interface ISortField {
  name: string
	value: TSortTypes
}
