interface Paths {
    assetsImages: string
}
// 获取图片
export function getImageUrl(name: string, dir: string) {
    console.log(dir)

    const dirMappingPath: Paths = {
        assetsImages: '../assets/images'
    }
    console.log()

    return new URL(`${dirMappingPath[dir as keyof Paths]}/${name}`, import.meta.url).href
}
