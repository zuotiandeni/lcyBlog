<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type blogItem } from '@/components/BlogListItem/blog-item'

let blogList = reactive<blogItem[]>([])
let currentPage = ref<number>(1)
let disabled = ref<boolean>(false)
const loadBlogData = ()=>{
    // 获取CSDN的数据
    fetch(`https://blog.csdn.net/community/home-api/v1/get-business-list?page=${currentPage.value}&size=20&businessType=blog&orderby=&noMore=false&year=&month=&username=m0_47135993`).then((res)=>{
        return res.json();
    }).then(data=>{
        currentPage.value++;
        blogList.push(...data.data.list)
        if (blogList.length >= data.data.total) {
            disabled.value = true
        }
    })
}

</script>

<template>
    <div v-infinite-scroll="loadBlogData" style="height: 100%;" :infinite-scroll-disabled="disabled">
        <template :key="item.articleId" v-for="item in blogList">
            <BlogListItem :itemDetails="item" />
        </template>
    </div>
    
</template>
