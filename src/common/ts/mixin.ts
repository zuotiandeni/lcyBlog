import { useSystemConfigStore } from '@/stores/generalConfig'
import { storeToRefs } from 'pinia'

// pinia使用（系统配置）
export const { systemDarkPattern } = storeToRefs(useSystemConfigStore())
export const { setSystemDarkPattern } = useSystemConfigStore()

// export {
//     systemDarkPattern,
//     setSystemDarkPattern
// }