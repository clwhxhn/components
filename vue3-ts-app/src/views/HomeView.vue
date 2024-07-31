<template>{{ msg }}<Child class="aaa" v-model.capitalize="msg"></Child></template>

<script setup lang="ts">
import Child from '@/components/Child.vue'
import { ref, inject } from 'vue'
const msg = ref()

const a = 'xsxs'
console.log('a: ', a)

inject('message', 'hellow')
</script>
