import { createPinia } from 'pinia'
import { useDictionaryStore } from './modules/dictionary'

const pinia = createPinia()

export { useDictionaryStore }
export default pinia
