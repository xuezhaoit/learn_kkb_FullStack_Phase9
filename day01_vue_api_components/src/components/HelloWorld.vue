<template>
  <div class="hello">
    <h2>{{ title }}</h2>
    <hr/>
    <el-row>
      <el-col :span="24">
          <h2>添加课程</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">课程名称</div></el-col>
      <el-col :span="12"><el-input v-model="courseName" placeholder="请输入内容"></el-input></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">课程价格</div></el-col>
      <el-col :span="12"><el-input v-model="coursePrice" placeholder="请输入内容"></el-input></el-col>
    </el-row>
    <hr/>
    <el-select v-model="selvalue" placeholder="请选择">
      <el-option
        v-for="item in courseListInfo"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button type="primary" @click="addCourse">添加到课程列表</el-button>
    <hr/>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">课程名称</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">课程价格</div></el-col>
    </el-row>
    <el-row v-for="(item, key, index) in courseList" :key="index">
      <el-col :span="8"><div class="grid-content bg-purple">{{ item.name }}</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">{{ item.price }}</div></el-col>
      <el-col :span="8"><el-button type="primary" size="mini" @click="addCart(key)">添加到购物车</el-button></el-col>
    </el-row>
    <hr/>
    <h2>购物车</h2>
   <el-row>
      <el-col :span="2"> 全选</el-col>
      <el-col :span="7"><div class="grid-content bg-purple">课程名称</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">课程单价</div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">数量</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">金额</div></el-col>
    </el-row>
    <cartCourse :cartList='cartList'></cartCourse>
    <hr/>
  </div>
</template>

<script>
import cartCourse from './Cart.vue'
export default {
  name: 'HelloWorld',
  
  data () {
    return {
      title: '购物车',
      selvalue:'', 
      courseName:'', //课程名称
      coursePrice:'',  //课程价格
      courseList: [],    //课程list
      courseListInfo:[
          {id:0,name:'全站1111',price:100},
          {id:1,name:'js高级1111',price:80},
          {id:2,name:'java1111',price:60},
      ],  //初始化课程信息
      cartList:[]
    }
  },
  methods: {
    addCourse(){
      console.log(this.selvalue);
      this.courseListInfo.forEach(item =>{
        if (item.id==this.selvalue) {
          this.courseList.push(item)
        }
      })
    },
    addCart(index){
      console.log('addCart',index);
      // 获取课程List的item
      let courseItem = this.courseList[index]
      // 判断购物车是否已经存在
      let hasCourse = this.cartList.find(item =>{ return item.id == courseItem.id})
      // 如果存在数量加1;重新添加
      if (hasCourse) {
        console.log(hasCourse);
        hasCourse.num += 1
      } else {
        let cartCouseItem = {
          ...courseItem,
          num:1,
          isActive:true
        }
        this.cartList.push(cartCouseItem)
      }
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
