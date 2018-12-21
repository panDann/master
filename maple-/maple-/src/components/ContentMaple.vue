<template>
     
      <div class="content-maple">
   
            <div class="content-maple-left">
              <h5>文章编辑器</h5>
              <div>
                  <span class="code-type-item" title="CSS代码" @click="addCharacter('C')">C</span>
                  <span class="code-type-item" title="HTML代码" @click="addCharacter('H')">H</span>
                  <span class="code-type-item" title="JS代码" @click="addCharacter('J')">J</span>
                  <span class="code-type-item" title="golang代码" @click="addCharacter('G')">G</span>
                  <span class="code-type-item" title="MySQL代码" @click="addCharacter('M')">M</span>
                  <span class="code-type-item" title="字符';''" @click="addCharacter(';')">;</span>
                  <span class="code-type-item" title="一个段落" @click="addCharacter('P')">p</span>
                  <span class="code-type-item" title="<br>换行符" @click="addCharacter('br')">br</span>
                  <span class="code-type-item" title="加粗" @click="addCharacter('B')">B</span>

                </div>
                <textarea name="" spellcheck="false"  placeholder="输入文章内容（必填）" v-model="areaContent" id="" class="editor-text"></textarea>
            </div>
 
      </div>
</template>
<script>
    import { mapState,mapActions } from 'vuex'
    export default {
        data () {
            return {
             areaContent:""
            }
        },
      
        mounted(){
        },
        watch:{
           
        },
        methods:{
         addCharacter(ch){
             var endCh=""
             switch(ch){
                case "J": endCh="\n<Jcode>\n\n</Jcode>"
                          break;
                case "G": endCh="\n<Gcode>\n\n</Gcode>"
                          break;
                case "M": endCh="\n<Mcode>\n\n</Mcode>"
                          break;
                case ";": endCh=";"
                          break;
                case "P": endCh="\n<p>\n\n</p>"
                          break;
                case "br": endCh="<br/>"
                          break;
                case "B": endCh="\n<strong>  </strong>"
                          break;
                case "C": endCh="\n<Ccode>\n\n</Ccode>"
                          break;
                case "H": endCh="\n<Hcode>\n\n</Hcode>"
                          break;
                default:break;
             }
             this.areaContent=this.areaContent+endCh
        },// addC end 
        parseCss(string){
            
        }
    }
    }
</script>

<style scoped>

.content-maple{
    /* background: rgb(161, 57, 57); */
    z-index: 0;
    position: absolute;
    z-index: 0;
    margin: 3.5rem 0;
    /* overflow:hidden; */
    border-radius: .2rem;
    width: 40rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    height: auto;
    left: 50%;
    transform: translate(-50%)
}
@media screen and (max-width: 768px) {
    .content-maple{
        width: 80%;
    }
}
.content-maple-username{
    width: 200px;
    background: rgb(228, 225, 225);
    margin-right: 2rem;
}
.content-maple-left{
    width: 100%;
}
.code-type-item{
    display: inline-block;
    height: 2rem;
    width: 2rem;
    color: rgb(195, 201, 192);
    text-align: center;
    margin: .1rem .2rem;
    padding: .2rem .4rem;
    border-radius: .2rem;
    cursor: pointer;
    background: bisque;
}
.editor-text{
    width: 100%;
    height: auto;
    margin-top: .5rem;
    min-height: 10rem;
    border-radius: .4rem;
    background: snow;
    outline: none;
    border:.5px solid #CCC;
    padding: 1rem;
    line-height: 1.5rem;
    font-size: 1rem;
}
h1{
  font-size: 2rem;
  font-weight: 100;
}
h2{
  font-size: 1.8rem;
  font-weight: 100;
}
h3{
  font-size: 1.6rem;
  font-weight: 100;
}
h4{
  font-size: 1.4rem;
  font-weight: 300;
}
h5{
  font-size: 1.2rem;
  font-weight: 100;
}
p{
    text-indent: 2rem;
}
</style>