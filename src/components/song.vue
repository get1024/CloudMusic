<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-05 18:35:50
 * @LastEditors: rjy 2025050361@henu.edu.cn
 * @LastEditTime: 2022-12-05 17:44:07
 * @FilePath: \src\components\song.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="wrap">
    <button @click="goBack()">&lt; 返回</button>
    <audio :src="src" autoplay ref="audio"></audio>
    <div class="conWrap">
      <img class="img1" src="../assets/img/songImg1.png" alt="" />
      <img
        class="img2"
        @click="fn1()"
        :src="obj.picUrl"
        v-if="obj.picUrl"
        alt=""
      />
      <img
        class="img3"
        @click="fn2()"
        v-if="flag"
        src="../assets/img/playIcon.png"
        alt=""
      />
      <img class="img4" src="../assets/img/songTop.png" alt="" />
    </div>
    <p>歌名：{{ obj.title }}</p>
    <p>歌手：{{ obj.name }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 用来存放音乐的播放地址，mp3存放的服务器地址
      src: '',
      obj: {
        //在后端请求数据
        picUrl: '',
        title: '',
        name: '',
      },
      //用来表示palyIcon是显示还是隐藏
      flag: false,
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    fn1() {
      //点击暂停
      this.$refs.audio.pause()
      this.flag = true
    },
    fn2() {
      this.$refs.audio.play()
      this.flag = false
    },
  },
  mounted() {
    // 页面一进来拿传递过来的id值
    var id = this.$route.query.id
    ///根据id请求当前这条歌曲所对应的数据
    axios({
      url: 'http://localhost:3000/song/url?id=' + id,
    }).then((res) => {
      //给data()里面的src赋值
      this.src = res.data.data[0].url
    })
    axios({
      url: 'http://localhost:3000/song/detail?ids=' + id,
    }).then((res) => {
      this.obj.picUrl = res.data.songs[0].al.picUrl
      this.obj.title = res.data.songs[0].al.name
      this.obj.name = res.data.songs[0].ar[0].name
    })
  },
}
</script>

<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background: rgb(17, 17, 17);
}
.wrap button {
  background: rgba(0, 0, 0, 0);
  color: white;
}
.conWrap {
  width: 2.4rem;
  height: 2.4rem;
  margin: 0 auto;
  margin-top: 0.26rem;
  position: relative;
  margin-bottom: 0.4rem;
}
.img1 {
  width: 2.4rem;
  height: 2.4rem;
}
.img2 {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  position: absolute;
  top: 0.45rem;
  left: 0.45rem;
  /* 绑定动画 */
  animation: my 10s linear infinite;
}
.img3 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 0.95rem;
  left: 0.95rem;
}
/* 动画的定义 */
@keyframes my {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
p {
  font: 0.22rem;
  line-height: 0.4rem;
  color: white;
  text-align: center;
}
.img4 {
  height: 1.2rem;
  position: absolute;
  left: 1.2rem;
  top: -0.5rem;
}
</style>
