const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot1k4p4/",
            name: "springboot1k4p4",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot1k4p4/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于java的个性化图书推荐系统"
        } 
    }
}
export default base
