<template>
  <div class="common-header">
    <div class="left">
      <slot name="left">
        <m-global-icon icon="icon-v2-arrow-left" @click="handleBack" />
      </slot>
    </div>
    <div class="center">
      <slot name="center">{{ title }}</slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
/**框架*/
/**工具库*/
/**类型*/
/**组件*/
/**自定义方法*/

export default {
  name: "commonHeader",
  props: {
    title: {
      type: String,
    },
  },
  methods: {
    handleBack() {},
  },
};
</script>

<style scoped lang="less">
.common-header {
  position: fixed;
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 10px 15px;
  justify-content: space-between;
  left: 0;
  right: 0;
  z-index: 99;
  .left {
  }
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: 600;
  }
  .right {
  }
}
</style>
