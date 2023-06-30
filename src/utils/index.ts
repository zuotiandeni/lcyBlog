interface Paths {
    assetsImages: string
}
// 获取图片
export function getImageUrl(name: string, dir: string) {
    console.log(dir)

    const dirMappingPath: Paths = {
        assetsImages: '/src/assets'
    }

    return new URL(`${dir}${name}`, import.meta.url).href
}
