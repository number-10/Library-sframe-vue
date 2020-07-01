<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="文件名称" prop="videoName">
      <el-input v-model="dataForm.videoName" placeholder="文件名称"></el-input>
    </el-form-item>
    <el-form-item label="A-A级 B-B级" prop="typeTag">
      <el-input v-model="dataForm.typeTag" placeholder="A-A级 B-B级"></el-input>
    </el-form-item>
    <el-form-item label="文件地址" prop="fileUrl">
      <el-input v-model="dataForm.fileUrl" placeholder="文件地址"></el-input>
    </el-form-item>
    <el-form-item label="文件地址2" prop="fileUrl2">
      <el-input v-model="dataForm.fileUrl2" placeholder="文件地址2"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="创建者ID" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建者ID"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="记录物理状态 A-存在 X-已删除" prop="state">
      <el-input v-model="dataForm.state" placeholder="记录物理状态 A-存在 X-已删除"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          videoId: 0,
          videoName: '',
          typeTag: '',
          fileUrl: '',
          fileUrl2: '',
          remark: '',
          createUserId: '',
          createTime: '',
          updateTime: '',
          state: ''
        },
        dataRule: {
          videoName: [
            { required: true, message: '文件名称不能为空', trigger: 'blur' }
          ],
          typeTag: [
            { required: true, message: 'A-A级 B-B级不能为空', trigger: 'blur' }
          ],
          fileUrl: [
            { required: true, message: '文件地址不能为空', trigger: 'blur' }
          ],
          fileUrl2: [
            { required: true, message: '文件地址2不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建者ID不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '记录物理状态 A-存在 X-已删除不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.videoId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.videoId) {
            this.$http({
              url: this.$http.adornUrl(`/video/video/info/${this.dataForm.videoId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.videoName = data.video.videoName
                this.dataForm.typeTag = data.video.typeTag
                this.dataForm.fileUrl = data.video.fileUrl
                this.dataForm.fileUrl2 = data.video.fileUrl2
                this.dataForm.remark = data.video.remark
                this.dataForm.createUserId = data.video.createUserId
                this.dataForm.createTime = data.video.createTime
                this.dataForm.updateTime = data.video.updateTime
                this.dataForm.state = data.video.state
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/video/video/${!this.dataForm.videoId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'videoId': this.dataForm.videoId || undefined,
                'videoName': this.dataForm.videoName,
                'typeTag': this.dataForm.typeTag,
                'fileUrl': this.dataForm.fileUrl,
                'fileUrl2': this.dataForm.fileUrl2,
                'remark': this.dataForm.remark,
                'createUserId': this.dataForm.createUserId,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'state': this.dataForm.state
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
