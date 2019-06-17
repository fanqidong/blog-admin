<template>
  <div class="page article-container">
    <section class="article-content">
         文章列表
    </section>
  </div>
</template>

<script>
export default {
    name:'Article',
    data() {
        return {
            tableHead: [
                    {
                        title: '标题',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        "sortable": true
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                tableData: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
.article{
    &-content{
        padding: 10px;
    }
}
</style>

