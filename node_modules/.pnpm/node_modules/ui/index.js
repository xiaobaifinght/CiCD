import { h } from "vue";
// 极简模块化：一个用 JS 渲染的 Vue 按钮组件
export const MyButton = {
  render() {
    return h("button", { style: "color: red" }, "企业级按钮");
  },
};
