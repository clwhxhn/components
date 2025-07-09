/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  import Vue from 'vue'
  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any> | Vue

  export default component
}
