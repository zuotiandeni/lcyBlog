<script setup lang="ts">
type subClassItem = {
    title?: string
    code: string
    describe: string
}
defineProps<{
    title: string
    subClassList: subClassItem[]
}>()

</script>

<template>
    <div class="design-mode-box">
        <h3>{{ title }}</h3>
        <div v-for="(item, index) in subClassList" :key="index">
            <h5 v-if="item.title">{{ item.title }}</h5>
            <div v-if="item.describe" class="design-mode-describe">
                {{ item.describe }}
            </div>
            <CodeMirror
                v-if="item.code"
                :disabled="true"
                :dark="true"
                :codeStyle="{
                    maxWidth: '100%'
                }"
                :code="item.code"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>


.design-mode-box {
    margin: 8px;

    h3{
        font-size: 20px;
    }

    h5 {
        font-size: 16px;
    }

    .design-mode-describe {
        --tw-bg-opacity: 1;
        font-size: 16px;
        white-space: pre-line;
        background-color: rgb(244 246 248/var(--tw-bg-opacity));
        padding: 8px;
        border-radius: 4px;
        margin: 10px 0;
    }
}


</style>
