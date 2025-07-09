<template>
  <div class="switch-button-wrapper">
    <label :class="['switch-label', checked ? 'checked' : 'unchecked', disabled ? 'disabled' : '']">{{ label }}</label>
    <button :class="['switch-btn', checked ? 'checked' : 'unchecked', disabled ? 'disabled' : '']"
            type="button" role="switch"
            @click="disabled ? e => e.preventDefault() : onSwitch()">
      <span :class="['switch-check', checked ? 'checked' : 'unchecked']"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SwitchButton",
  props: {
    label: {
      type: String,
      default: '开关'
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: this.defaultChecked,
    }
  },
  methods: {
    onSwitch() {
      this.checked = !this.checked;
      this.$emit('switchChanged', this.checked);
    }
  }

}
</script>

<style lang="less" scoped>

.switch-button-wrapper {
  font-family: FZLanTYJW;
  font-size: 12px;
  display: flex;
  align-items: center;

  .label {
    margin-right: 4px;

    &.checked {
      color: #c1c1c1;
    }
    &.unchecked {
      color: #838383;
    }
  }

  .switch-btn {
    position: relative;
    border-radius: 11px;
    display: block;
    width: 33px;
    height: 18.5px;
    flex-shrink: 0;
    border: 1px solid #7a7a7a;
    background-color: #575757;
    transition: border-color .25s,background-color .25s;
    margin-left: 4px;

    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
      opacity: .5;
    }

    &:hover {
      border: 1px solid #c7c7c7;
    }

    &.checked {
      background-color: #2a5b8f;
    }

    .switch-check {
      position: absolute;
      top: 1px;
      left: 0px;
      width: 14px;
      height: 14px;
      border-radius: 50%;

      box-shadow: 0 0 2px #383838;
      transition: background-color .25s, transform .25s;

      &.checked {
        transform: translate(1px);
        background-color: #fff;
      }

      &.unchecked {
        transform: translate(15px);
        background-color: #cccccc;
      }

    }
  }
}

</style>