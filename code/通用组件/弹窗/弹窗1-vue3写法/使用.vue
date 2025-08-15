<template>
     <BaseModal
        v-model:visible="showReservoirWQ"
        title="标题"
        :width="pxToRem(700)">
        内容
        <template #footer></template>
    </BaseModal>
</template>

