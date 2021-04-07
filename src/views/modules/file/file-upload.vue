<template>
  <!-- <el-dialog -->
  <div>
    <div
      title="上传文件"
      :close-on-click-modal="false"
      @close="closeHandle"
      :visible.sync="visible">
      <el-upload
        drag
        :action="url"
        :before-upload="beforeUploadHandle"
        :on-success="successHandle"
        multiple
        :file-list="fileList"
        style="text-align: center;">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只支持jpg、png、gif格式的图片！</div>
      </el-upload>
    </div>
    <!-- </el-dialog>  -->
    <div title="上传结果" :visible.sync="visible2">
      <el-form>
        <el-form-item label="文件访问地址1" prop="fileUrl" >
          <el-input v-model="resultDivData.fileUrl" placeholder="文件地址" ></el-input>
        </el-form-item>
        <el-form-item label="文件访问地址2" prop="fileUrl2">
          <el-input v-model="resultDivData.fileUrl2" placeholder="文件地址2"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: true,
        visible2: true,
        url: '',
        num: 0,
        successNum: 0,
        fileList: [],

        resultDivData: {
          fileUrl: '',
          fileUrl2: ''
        }
      };
    },
    created() {
      this.init(1);
    },
    methods: {
      init(id) {
        this.url = this.$http.adornUrl(`/photobed/upload`)
        this.visible = true;
      },
      // 上传之前
      beforeUploadHandle(file) {
        if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          this.$message.error('只支持jpg、png、gif格式的图片！');
          return false;
        }
        this.num++;
      },
      // 上传成功
      successHandle(response, file, fileList) {
        this.fileList = fileList
        this.successNum++
        if (response && response.code === 0) {

          this.resultDivData.fileUrl = response.data.url;
          this.resultDivData.fileUrl2 = response.data.simpleUrl;
        } else {
          this.$message.error(response.msg);
        }
      },
      // 弹窗关闭时
      closeHandle() {
        this.fileList = []
        this.$emit('refreshDataList')
      }
    }
  }
</script>
