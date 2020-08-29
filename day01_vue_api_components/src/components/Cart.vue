<template>
  <div class="hello">
   <el-row>
      <el-col :span="2"> 全选</el-col>
      <el-col :span="7"><div class="grid-content bg-purple">课程名称</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">课程单价</div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">数量</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">金额</div></el-col>
    </el-row>
    <el-row v-for="(item, key) in cartList" :key="key">
      <el-col :span="2"><el-checkbox v-model="item.isActive"></el-checkbox></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">{{item.name}}</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">{{item.price}}</div></el-col>
      <el-col :span="7"><button>-</button>{{item.num}}<button>+</button></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">{{ item.price*item.num }}</div></el-col>
    </el-row>
    <hr/>
  </div>
</template>

<script>
export default {
  props:['cartList'],
  data () {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
