<template>
<div :style='{"width":"1000px","padding":"20px","boxShadow":"0px 4px 10px 0px rgba(0,0,0,0.302)","margin":"10px auto","position":"relative","background":"#fff"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
    >
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}' label="图书名称" prop="tushumingcheng">
            <el-input v-model="ruleForm.tushumingcheng" 
                placeholder="图书名称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}'  label="图书分类" prop="tushufenlei">
            <el-select v-model="ruleForm.tushufenlei" placeholder="请选择图书分类"  >
              <el-option
                  v-for="(item,index) in tushufenleiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}' label="图书封面" v-if="type!='cross' || (type=='cross' && !ro.tushufengmian)" prop="tushufengmian">
            <file-upload
            tip="点击上传图书封面"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.tushufengmian?ruleForm.tushufengmian:''"
            @change="tushufengmianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}' class="upload" v-else label="图书封面" prop="tushufengmian">
                <img v-if="ruleForm.tushufengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.tushufengmian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.tushufengmian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}' label="图书作者" prop="tushuzuozhe">
            <el-input v-model="ruleForm.tushuzuozhe" 
                placeholder="图书作者" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}' label="出版社" prop="chubanshe">
            <el-input v-model="ruleForm.chubanshe" 
                placeholder="出版社" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}' label="单次限购" prop="onelimittimes">
            <el-input v-model="ruleForm.onelimittimes" 
                placeholder="单次限购" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}' label="图书库存" prop="alllimittimes">
            <el-input v-model="ruleForm.alllimittimes" 
                placeholder="图书库存" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}' label="价格" prop="price">
            <el-input v-model="ruleForm.price" 
                placeholder="价格" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"0 2% 10px","display":"inline-block"}' label="图书详情" prop="tushuxiangqing">
            <editor 
                :style='{"minHeight":"400px","padding":"0","boxShadow":"0 0 6px #2e61e1","margin":"0","borderColor":"#ccc","backgroundColor":"#fff","borderRadius":"0","color":"#000","borderWidth":"0","width":"100%","borderStyle":"solid","height":"auto"}'
                v-model="ruleForm.tushuxiangqing" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","backgroundColor":"#fff","color":"rgba(255, 255, 255, 1)","backgroundImage":"url(http://codegen.caihongy.cn/20221018/f6c1f39bff574b6cb2564bbedb76b604.png)","outline":"none","borderRadius":"4px","width":"128px","lineHeight":"40px","fontSize":"14px","backgroundSize":"100% 100%","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"0px solid rgba(64, 158, 255, 1)","cursor":"pointer","padding":"0","margin":"0","backgroundColor":"#fff","color":"#fff","backgroundImage":"url(http://codegen.caihongy.cn/20221018/71c4fd01e19542dda750b9c9523c11bd.png)","outline":"none","borderRadius":"4px","width":"128px","lineHeight":"40px","fontSize":"14px","backgroundSize":"100% 100%","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        baseUrl: '',
        ro:{
            tushumingcheng : false,
            tushufenlei : false,
            tushufengmian : false,
            tushuzuozhe : false,
            chubanshe : false,
            tushuxiangqing : false,
            onelimittimes : false,
            alllimittimes : false,
            clicktime : false,
            price : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          tushumingcheng: '',
          tushufenlei: '',
          tushufengmian: '',
          tushuzuozhe: '',
          chubanshe: '',
          tushuxiangqing: '',
          onelimittimes: '-1',
          alllimittimes: '-1',
          clicktime: '',
          price: '',
        },
        tushufenleiOptions: [],
        rules: {
          tushumingcheng: [
            { required: true, message: '图书名称不能为空', trigger: 'blur' },
          ],
          tushufenlei: [
          ],
          tushufengmian: [
          ],
          tushuzuozhe: [
          ],
          chubanshe: [
          ],
          tushuxiangqing: [
          ],
          onelimittimes: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          alllimittimes: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          clicktime: [
          ],
          price: [
            { required: true, message: '价格不能为空', trigger: 'blur' },
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
        },
      };
    },
    computed: {



    },
    created() {
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='tushumingcheng'){
              this.ruleForm.tushumingcheng = obj[o];
              this.ro.tushumingcheng = true;
              continue;
            }
            if(o=='tushufenlei'){
              this.ruleForm.tushufenlei = obj[o];
              this.ro.tushufenlei = true;
              continue;
            }
            if(o=='tushufengmian'){
              this.ruleForm.tushufengmian = obj[o].split(",")[0];
              this.ro.tushufengmian = true;
              continue;
            }
            if(o=='tushuzuozhe'){
              this.ruleForm.tushuzuozhe = obj[o];
              this.ro.tushuzuozhe = true;
              continue;
            }
            if(o=='chubanshe'){
              this.ruleForm.chubanshe = obj[o];
              this.ro.chubanshe = true;
              continue;
            }
            if(o=='tushuxiangqing'){
              this.ruleForm.tushuxiangqing = obj[o];
              this.ro.tushuxiangqing = true;
              continue;
            }
            if(o=='onelimittimes'){
              this.ruleForm.onelimittimes = obj[o];
              this.ro.onelimittimes = true;
              continue;
            }
            if(o=='alllimittimes'){
              this.ruleForm.alllimittimes = obj[o];
              this.ro.alllimittimes = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
            if(o=='price'){
              this.ruleForm.price = obj[o];
              this.ro.price = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/tushufenlei/tushufenlei', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.tushufenleiOptions = res.data.data;
          }
        });
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('tushuxinxi/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

        //更新跨表属性
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        this.$refs["ruleForm"].validate(valid => {
          if(valid) {
            if(this.type=='cross'){
                 var statusColumnName = localStorage.getItem('statusColumnName');
                 var statusColumnValue = localStorage.getItem('statusColumnValue');
                 if(statusColumnName && statusColumnName!='') {
                     var obj = JSON.parse(localStorage.getItem('crossObj'));
                     if(!statusColumnName.startsWith("[")) {
                         for (var o in obj){
                             if(o==statusColumnName){
                                 obj[o] = statusColumnValue;
                             }
                         }
                         var table = localStorage.getItem('crossTable');
                         this.$http.post(table+'/update', obj).then(res => {});
                     } else {
                            crossuserid=Number(localStorage.getItem('userid'));
                            crossrefid=obj['id'];
                            crossoptnum=localStorage.getItem('statusColumnName');
                            crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                     }
                 }
            }
            if(crossrefid && crossuserid) {
                 this.ruleForm.crossuserid=crossuserid;
                 this.ruleForm.crossrefid=crossrefid;
                 var params = {
                     page: 1,
                     limit: 10,
                     crossuserid:crossuserid,
                     crossrefid:crossrefid,
                 }
                 this.$http.get('tushuxinxi/list', {
                  params: params
                 }).then(res => {
                     if(res.data.data.total>=crossoptnum) {
                         this.$message({
                          message: localStorage.getItem('tips'),
                          type: 'success',
                          duration: 1500,
                         });
                          return false;
                     } else {
                         // 跨表计算


                          this.$http.post('tushuxinxi/add', this.ruleForm).then(res => {
                              if (res.data.code == 0) {
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              } else {
                                  this.$message({
                                      message: res.data.msg,
                                      type: 'error',
                                      duration: 1500
                                  });
                              }
                          });
                     }
                 });
             } else {


                  this.$http.post('tushuxinxi/add', this.ruleForm).then(res => {
                     if (res.data.code == 0) {
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                  this.$router.go(-1);
                              }
                          });
                      } else {
                          this.$message({
                              message: res.data.msg,
                              type: 'error',
                              duration: 1500
                          });
                      }
                  });
             }
          }
        });
      },
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
      // 返回
      back() {
        this.$router.go(-1);
      },
      tushufengmianUploadChange(fileUrls) {
          this.ruleForm.tushufengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 120px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: center;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 120px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 2px solid #2e61e1;
	  border-radius: 4px;
	  padding: 0 12px;
	  outline: none;
	  color: #000;
	  background: #BFD2FC;
	  width: 100%;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 2px solid #2e61e1;
	  border-radius: 4px;
	  padding: 0 10px;
	  outline: none;
	  color: #000;
	  background: #BFD2FC;
	  width: 100%;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 2px solid #2e61e1;
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  outline: none;
	  color: #000;
	  background: #BFD2FC;
	  width: 100%;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  border: 1px dashed rgba(64, 158, 255, 1);
	  cursor: pointer;
	  border-radius: 6px;
	  color: rgba(64, 158, 255, 1);
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px dashed rgba(64, 158, 255, 1);
	  cursor: pointer;
	  border-radius: 6px;
	  color: rgba(64, 158, 255, 1);
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px dashed rgba(64, 158, 255, 1);
	  cursor: pointer;
	  border-radius: 6px;
	  color: rgba(64, 158, 255, 1);
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 2px solid #2e61e1;
	  border-radius: 4px;
	  padding: 12px;
	  outline: none;
	  color: #000;
	  background: #BFD2FC;
	  width: 100%;
	  font-size: 14px;
	  height: 120px;
	}
</style>
