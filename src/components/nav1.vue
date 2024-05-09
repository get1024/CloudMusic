<!--
 * @Date: 2022-06-05 18:32:49
 * @LastEditors: rjy 2025050361@henu.edu.cn
 * @LastEditTime: 2022-12-05 17:45:29
 * @FilePath: \src\components\nav1.vue
-->
<template>
  <div>
    <div class="head">
      <img class="headImg1" src="../assets/img/hotBack.jpg" alt="" />
      <img class="headImg2" src="../assets/img/hotHeader.png" alt="" />
      <p>更新日期：{{ time }}</p>
    </div>
    <div class="list">
      <div v-for="(item, index) in list" :key="index" class="con">
        <div class="conLeft">
          <p :class="index < 3 ? 'active' : ''">
            {{ String(index + 1).padStart(2, '0') }}
          </p>
        </div>
        <div class="conRight" @click="goSong(item.id)">
          <div class="content">
            <p class="conTop">{{ item.name }}</p>
            <p class="bottom">
              <img class="sqIcon" src="../assets/img/indexSQ.png" alt="" />
              {{ item.ar[0].name }} - {{ item.al.name }}
            </p>
          </div>
          <img class="playIcon" src="../assets/img/playIcon.png" alt="" />
        </div>
      </div>
    </div>
    <div class="footerItem">
      <p class="footer">查看完整榜单 ></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      time: '',
      list: [],
    }
  },
  methods: {
    changeTime() {
      var date = new Date()
      var y = date.getFullYear()
      //padStart 补零
      var m = String(date.getMonth() + 1).padStart(2, '0')
      var d = String(date.getDate()).padStart(2, '0')
      var h = String(date.getHours()).padStart(2, '0')
      var mi = String(date.getMinutes()).padStart(2, '0')
      var s = String(date.getSeconds()).padStart(2, '0')
      var str = y + '年' + m + '月' + d + '日  ' + h + ':' + mi + ':' + s
      this.time = str
    },
    goSong(id) {
      console.log(id)
      this.$router.push('/song?id=' + id)
    },
  },
  mounted() {
    // 页面一进来就执行
    this.changeTime()
    // 页面一进来就开启定时器，虽然定时器中也执行了修改时间，但是刚开始会有1秒钟的空白
    setInterval(() => {
      this.changeTime()
    }, 1000)
    //页面一进来就请求列表数据
    axios({
      url: 'http://localhost:3000/top/list?idx=1',
    }).then((res) => {
      var list = res.data.playlist.tracks.splice(0, 40)
      this.list = list
    })
  },
}
</script>

<style scoped>
.head {
  position: relative;
}
.headImg1 {
  width: 100%;
}
.headImg2 {
  width: 38%;
  position: absolute;
  top: 0.25rem;
  left: 0.2rem;
}
.head p {
  position: absolute;
  top: 1.05rem;
  left: 0.2rem;
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 12px;
}
.con {
  overflow: hidden;
}
.conLeft {
  float: left;
  width: 10%;
  font-size: 0.17rem;
  text-align: center;
  padding-top: 0.05rem;
  line-height: 0.4rem;
  color: #999;
}
.conRight {
  float: right;
  width: 90%;
  overflow: hidden;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.06rem;
}
.content {
  width: 80%;
}
.conTop {
  font-size: 0.17rem;
  line-height: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  color: #333;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.bottom {
  font-size: 0.12rem;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.bottom img {
  /* 行内块级元素 */
  display: inline-block;
  width: 0.12rem;
  height: 0.08rem;
  margin-right: 0.04rem;
}
.conRight div {
  float: left;
}
.playIcon {
  float: right;
  margin-right: 0.1rem;
  width: 0.22rem;
  height: 0.22rem;
  /* align-items 属性定义flex
  子项在flex容器的当前行的侧轴
  （纵轴）方向上的对齐方式。 */
  align-items: center;
  padding-top: 0.13rem;
}
.active {
  color: #df3436;
}
.footerItem {
  height: 0.55rem;
  line-height: 0.55rem;
  text-align: center;
}
.footer {
  display: inline-block;
  color: #999;
  padding-right: 0.14rem;
}
</style>
