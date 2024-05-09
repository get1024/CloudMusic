<!--
 * @Date: 2022-06-05 18:32:49
 * @LastEditors: rjy 2025050361@henu.edu.cn
 * @LastEditTime: 2022-12-05 17:45:29
 * @FilePath: \src\components\nav0.vue
-->
<template>
  <div>
    <!-- 推荐歌单部分 -->
    <div class="gedan">
      <h4>推荐歌单</h4>
      <div class="gedanWrap">
        <div class="gedanDiv1" v-for="(item, index) in list" :key="index">
          <img class="tuijianImg" :src="item.picUrl" alt="" />
          <p class="itemname">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐部分（新歌速递） -->
    <div class="zuixin">
      <h4>最新音乐</h4>
      <div>
        <div
          class="zuixinWrap"
          v-for="(item, index) in list1"
          :key="index"
          @click="goSong(item.id)"
        >
          <div class="zuixinLeft">
            <p class="zuixinP1">{{ item.name }}</p>
            <p class="zuixinP2">
              <img class="imageSQ" src="../assets/img/indexSQ.png" alt="" />
              {{ item.artists[0].name }}
              <span v-if="item.alias[0]">-{{ item.alias[0] }}</span>
              <span v-else>-{{ item.name }}</span>
            </p>
          </div>
          <div class="zuixinRight">
            <img src="../assets/img/playIcon.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 尾部展示部分 -->
    <div class="foot">
      <img class="footLogo" src="../assets/img/footLogo.png" alt="" />
      <p class="footP1">打开APP，发现更多好音乐></p>
      <p class="footP2">
        网易云公司版权所有©1997-2021 杭州乐读科技有限公司运营
      </p>
      <p></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  //存放数据
  data() {
    return {
      //用来渲染推荐歌单的的数据
      list: [],
      //用来渲染最新音乐的数据
      list1: [],
    }
  },
  methods: {
    goSong(id) {
      console.log(id)
      this.$router.push('/song?id=' + id)
    },
  },
  //生命周期，页面一进来就要做数据请求
  mounted() {
    // 1.页面一进来请求推荐歌单的接口数据
    axios({
      url: 'http://localhost:3000/personalized?limit=6',
    }).then((res) => {
      console.log(res.data.result)
      //给list赋值，list有了数据我们就能渲染页面了
      this.list = res.data.result
    })

    // 2.页面一进来请求新歌速递的接口数据
    axios({
      url: 'http://localhost:3000/top/song?type=0',
    }).then((res) => {
      //两种数组截取的方式

      // var arr=res.data.data.filter((item,index)=>{
      //   return index < 10
      // })
      // console.log(arr);
      console.log(res.data.data)
      var arr = res.data.data.splice(0, 10)
      //给list1赋值，list1有了数据我们就能渲染界面了
      this.list1 = arr
    })
  },
}
</script>

<style scoped>
.gedan h4 {
  border-left: 2px solid rgb(212, 60, 51);
  padding-left: 0.08rem;
  font-size: 0.16rem;
  font-weight: 350;
  margin: 0.1rem 0;
  line-height: 0.3rem;
}

.gedanWrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.tuijianImg {
  width: 100%;
}

.gedanDiv1 {
  width: 1.2rem;
  margin: 0.06rem 0.02rem;
}

.gedanDiv1 p {
  padding: 6px 2px 0 6px;
  min-height: 30px;
  line-height: 1.2;
  font-size: 0.13rem;
  font-weight: 300;
  /* 文本格式化-->超出两行默认展示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  /* 弹性伸缩盒子 */
  display: -webkit-box;
  /* 在第几行显示省略号 */
  -webkit-line-clamp: 2;
  /* 内容的排列方式 */
  -webkit-box-orient: vertical;
}

.zuixin h4 {
  border-left: 2px solid rgb(212, 60, 51);
  font-size: 0.17rem;
  font-weight: 350;
  position: relative;
  padding-left: 0.09rem;
  margin-bottom: 0.14rem;
  font-size: 0.17rem;
  height: 0.2rem;
  line-height: 0.2rem;
}

.zuixinWrap {
  width: 100%;
  margin: 0 0;
  padding-left: 10px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  margin-bottom: 10px;
}

.zuixinLeft {
  width: 85%;
  float: left;
}

.zuixinRight {
  float: right;
}

.zuixinP1 {
  font-size: 0.17rem;
  line-height: 0, 3rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.zuixinP2 {
  font-size: 0.12rem;
  line-height: 0.26rem;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.zuixinP2 img {
  display: inline-block;
  width: 0.12rem;
  height: 0.08rem;
  margin-right: 0.04rem;
}

.zuixinRight img {
  margin-top: 7px;
  width: 50%;
}

.foot {
  text-align: center;
  background-image: url('../assets/img/footBack.png');
  /* 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。 */
  background-size: contain;
}

.footBack {
  width: 100%;
}

.footLogo {
  width: 60%;
  margin: 0 auto;
  margin-top: 17%;
}

.footP1 {
  line-height: 38px;
  border: 1px solid #d33a31;
  border-radius: 38px;
  font-size: 16px;
  color: #d33a31;
  margin: 15px 37px 5px;
}

.footP2 {
  color: #888;
  font-size: 12px;
  line-height: 16px;
  /* 缩小  针对safari浏览器支持*/
  -webkit-transform: scale(0.75);
  /* 缩小 针对IE浏览器支持 */
  -ms-transform: scale(0.75);
  transform: scale(0.75);
}
</style>
