<!--
 * @Date: 2022-06-05 18:32:49
 * @LastEditors: rjy 2025050361@henu.edu.cn
 * @LastEditTime: 2022-12-05 17:45:29
 * @FilePath: \src\components\nav2.vue
-->
<template>
  <div>
    <div class="inpBox">
      <input
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        v-model="msg"
        @input="changeINP"
      />
    </div>
    <div class="A" v-if="flag == 0">
      <p class="con1P1">热门搜索</p>
      <span
        v-for="(item, index) in list1"
        :key="index"
        @click="clickHot(item.first)"
        >{{ item.first }}</span
      >
    </div>
    <div class="B" v-if="flag == 1">
      <i @click="searchQuery()">搜索“{{ msg }}”</i>
      <p
        v-for="(item, index) in list2"
        :key="index"
        @click="search(item.keyword)"
      >
        <img src="../assets/img/search.svg" alt="" />
        <span>{{ item.keyword }}</span>
      </p>
    </div>
    <div class="C" v-if="flag == 2">
      <div
        class="Ccon"
        v-for="(item, index) in list3"
        :key="index"
        @click="goSong(item.id)"
      >
        <div class="CconLeft">
          <p class="oP1">{{ item.name }}</p>
          <div class="oDiv1">
            <img src="../assets/img/indexSQ.png" alt="" />
            <p>{{ item.artists[0].name }}-{{ item.name }}</p>
          </div>
        </div>
        <div class="CconRight">
          <img src="../assets/img/playIcon.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      flag: 0,

      list1: [],

      msg: '',

      list2: [],

      list3: [],
    }
  },
  methods: {
    changeINP() {
      // 判断输入框是否有内容
      if (this.msg.length > 0) {
        //有内容的话就跳转到flag=1页面 --> 联想列表
        this.flag = 1
        //渲染联想列表的数据内容
        axios({
          url:
            'http://localhost:3000/search/suggest?keywords=' +
            this.msg +
            '&type=mobile',
        }).then((res) => {
          console.log(res.data.result.allMatch)
          this.list2 = res.data.result.allMatch
        })
      } else {
        //没有内容就还展示联想页面
        this.flag = 0
      }
    },

    search(keywords) {
      console.log(keywords)
      axios({
        url: 'http://localhost:3000/search?keywords=' + keywords,
      }).then((res) => {
        console.log(res)
        console.log(res.data.result.songs)

        this.flag = 2

        this.list3 = res.data.result.songs

        this.msg = keywords
      })
    },

    clickHot(keywords) {
      axios({
        url: 'http://localhost:3000/search?keywords=' + keywords,
      }).then((res) => {
        this.msg = keywords

        this.flag = 2

        this.list3 = res.data.result.songs
      })
    },

    searchQuery() {
      axios({
        url: 'http://localhost:3000/search?keywords=' + this.msg,
      }).then((res) => {
        this.flag = 2

        this.list3 = res.data.result.songs
      })
    },

    goSong(id) {
      console.log(id)

      this.$router.push('/song?id=' + id)
    },
  },
  mounted() {
    //页面进来首先请求hots歌单数据
    axios({
      url: 'http://localhost:3000/search/hot',
    }).then((res) => {
      this.list1 = res.data.result.hots
    })
  },
}
</script>

<style scoped>
.inpBox {
  border-bottom: 1px solid #eee;
}
.inpBox input {
  height: 0.3rem;
  width: 95%;
  padding: 0 0.3rem;
  margin: 0.1rem auto;
  display: block;
  font-size: 0.14rem;
  line-height: 0.4rem;
  border-radius: 0.3rem;
  border: none;
  background: #ebecec;
  padding: 0 0.1rem;
  outline: none;
  /* 元素的总高度和宽度包含内边距和边框(padding 与 border) */
  box-sizing: border-box;
}

.A {
  padding: 0.15rem 0.1rem 0;
  width: 100%;
  margin: 0 auto;
}
.con1P1 {
  color: #666;
  font-size: 0.12rem;
  line-height: 0.12rem;
  margin-bottom: 0.1rem;
}
.A span {
  border-radius: 0.18rem;
  border: 1px solid #eee;
  display: inline-block;
  height: 32px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 32px;
  color: #333;
}

.B i {
  display: block;
  font-size: 0.15rem;
  line-height: 0.5rem;
  color: #507daf;
  border-bottom: 1px solid #eee;
  margin-left: 0.1rem;
}
.B p {
  overflow: hidden;
  height: 0.45rem;
}
.B img {
  width: 0.15rem;
  height: 0.15rem;
  float: left;
  margin-top: 0.1rem;
  margin-left: 0.05rem;
}
.B span {
  display: block;
  padding-bottom: 0.04rem;
  font-size: 0.15rem;
  line-height: 0.35rem;
  border-bottom: 1px solid #eee;
  color: #333;
  padding-left: 0.25rem;
}

.Ccon {
  overflow: hidden;
  height: 0.5rem;
  margin: 2px 0;
  padding: 0.03rem 0;
  border-bottom: 1px solid #eee;
}
.Ccon .CconLeft {
  width: 80%;
  margin-left: 0.08rem;
  float: left;
}
.Ccon .CconRight {
  float: right;
  margin-right: 0.08rem;
}
.CconRight img {
  margin-top: 0.17rem;
  width: 50%;
}
.oP1 {
  font-size: 0.17rem;
  line-height: 0.3rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.oDiv1 img {
  float: left;
  margin-top: 2px;
  width: 0.12rem;
  height: 0.08rem;
}
.oDiv1 p {
  display: inline-block;
  font-size: 0.12rem;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-left: 15px;
}
</style>
