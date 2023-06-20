<script setup lang="ts">
import { type blogItem } from '@/components/BlogListItem/blog-item'
defineProps<{
    itemDetails: blogItem
}>()
</script>

<template>
    <article class="blog-list-box">
        <a :href="itemDetails.url" target="_blank">
            <div class="blog-item-body">
                <div>
                    <div class="blog-item-title">
                        <h4>{{ itemDetails.title }}</h4>
                    </div>
                    <div class="blog-item-abstract">{{ itemDetails.description }}</div>
                </div>
                <div class="blog-item-footer">
                    <span>发布时间：{{ itemDetails.postTime }}</span>
                    <span>阅读量：{{itemDetails.viewCount }}</span>
                </div>
            </div>
        </a>
    </article>
</template>

<style scoped lang="scss">
.blog-list-box {
    background: #fff;
    a {
        display: flex;
        padding: 24px;
        // margin: 0 24px;
        border-bottom: 1px solid #f0f0f2;
        cursor: pointer;
    }
    .blog-item-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto, Noto,
            Helvetica Neue, sans-serif;

        .blog-item-title {
            display: flex;
            h4 {
                font-size: 18px;
                font-weight: 500;
                line-height: 24px;
                color: #222226;
                overflow: hidden;
                white-space: normal;
                word-break: break-word;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;

                &:hover {
                    color: #fc5531;
                }
            }
        }

        .blog-item-abstract {
            color: #555666;
            margin-top: 4px;
            line-height: 19px;
            overflow: hidden;
            white-space: normal;
            word-break: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        .blog-item-footer {
            color: #555666;
            line-height: 20px;
            font-size: 14px;
            margin-top: 12px;

            span {
                display: inline-block;
                margin-right: 8px;
                position: relative;
            }
            span:nth-child(n + 2) {
                &:before {
                    position: absolute;
                    top: calc(50% - 0.45rem);
                    height: 0.9rem;
                    left: -8px;
                    content: '';
                    width: 0;
                    border-left: 1px solid #e7e8eb;
            }
    }
        }
    }
}
</style>
