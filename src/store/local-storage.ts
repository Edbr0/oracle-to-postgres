export const sortAlphabetically = useStorage('icones-alpha-sort-collections', false)
export const favoritedIds = useStorage<string[]>('icones-fav-collections', [])
export const recentIds = useStorage<string[]>('icones-recent-collections', [])
export const incrementIcons = useStorage('icons-number-increment', 100)
export const isOpenSidebar = useStorage('isOpenSidebar', true)
export const session = useStorage<string>('session', '')
export const menuSideBar = useStorage<object | string>('sb', [])
export const dataUser = useStorage<any>('data-user', {})

export function isFavorited(id: string) {
  return favoritedIds.value.includes(id)
}

export function isRecent(id: string) {
  return recentIds.value.includes(id)
}

export function autoIncrement(int: string) {
  incrementIcons.value = Number(int)
}
