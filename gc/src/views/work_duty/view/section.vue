<template>
    <div class="section">
             <Card style="width:30%">
        <p slot="title">
            职责
        </p>
    
        <div>
            职责介绍
            职责介绍
            职责介绍
            职责介绍
            职责介绍
            职责介绍

        </div>
    </Card> 
       <Card style="width:30%">
        <p slot="title">
            职责
        </p>
    
        <div>
            职责介绍
            职责介绍
            职责介绍
            职责介绍
            职责介绍
            职责介绍

        </div>
    </Card> 
       <Card style="width:30%">
        <p slot="title">
            职责
        </p>
    
        <div>
            职责介绍
            职责介绍
            职责介绍
            职责介绍
            职责介绍
            职责介绍

        </div>
    </Card> 
    </div>
   
</template>
<script>
    export default {
        data () {
            return {
                movieList: [
        
                ],
                randomMovieList: []
            }
        },
        methods: {
            changeLimit () {
                function getArrayItems(arr, num) {
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i<num; i++) {
                        if (temp_array.length>0) {
                            const arrIndex = Math.floor(Math.random()*temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }
                this.randomMovieList = getArrayItems(this.movieList, 5);
            }
        },
        mounted () {
            this.changeLimit();
        }
    }
</script>

<style lang="stylus" scoped>
    .section
        display flex 
        flex-flow row wrap
        justify-content space-around
</style>
