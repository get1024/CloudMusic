<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-05-29 14:56:10
 * @LastEditors: rjy 2025050361@henu.edu.cn
 * @LastEditTime: 2022-12-05 17:43:38
 * @FilePath: \src\components\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 头部 -->
    <div class="head">
      <img src="../assets/img/head.png" alt="" />
    </div>
    <!-- 导航栏 -->
    <div class="nav">
      <p :class="flag == 0 ? 'active' : ''" @click="clickNav0()">推荐音乐</p>
      <p :class="flag == 1 ? 'active' : ''" @click="clickNav1()">热歌榜</p>
      <p :class="flag == 2 ? 'active' : ''" @click="clickNav2()">搜索</p>
    </div>
    <!-- 正式的内容部分 -->
    <div>
      <nav0 v-if="flag == 0"></nav0>
      <nav1 v-if="flag == 1"></nav1>
      <nav2 v-if="flag == 2"></nav2>
    </div>
  </div>
</template>

<script>
// 引入子组件
import Nav0 from './nav0.vue'
import Nav1 from './nav1.vue'
import Nav2 from './nav2.vue'

export default {
  // data是用来存放数据的
  data() {
    return {
      flag: 0,
    }
  },
  // methods是用来存放函数的
  methods: {
    clickNav0() {
      this.flag = 0
    },
    clickNav1() {
      this.flag = 1
    },
    clickNav2() {
      this.flag = 2
    },
  },
  // components是用来注册子组件的
  components: {
    Nav0: Nav0,
    Nav1: Nav1,
    Nav2: Nav2,
  },
}
</script>

<style scoped>
/* 头部样式 */
.head img {
  width: 100%;
  height: 84px;
}

/* 导航栏样式 */
.nav {
  width: 100%;
  height: 40px;
  /* display:flex --> 弹性盒子 
  space-around --> 均匀排列每个元素 每个元素周围分配相同的空间 */
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
}
.nav p {
  font-size: 0.15rem;
  font-weight: 400;
  line-height: 0.4rem;
  color: #333;
}
.nav .active {
  color: rgb(212, 60, 51);
  border-bottom: 2px solid rgb(212, 60, 51);
}
</style>
