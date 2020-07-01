<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="文件名称" prop="musicName">
      <el-input v-model="dataForm.musicName" placeholder="角色名称"></el-input>
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
          musicId: 0,
          musicName: '',
          fileUrl: '',
          fileUrl2: '',
          remark: '',
          createUserId: '',
          createTime: '',
          updateTime: '',
          state: ''
        },
        dataRule: {
          musicName: [
            { required: true, message: '文件名称不能为空', trigger: 'blur' }
          ],
          fileUrl: [
            { required: false, message: '文件地址不能为空', trigger: 'blur' }
          ],
          fileUrl2: [
            { required: false, message: '文件地址2不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: false, message: '创建者ID不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: false, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: false, message: '更新时间不能为空', trigger: 'blur' }
          ],
          state: [
            { required: false, message: '记录物理状态 A-存在 X-已删除不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.musicId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.musicId) {
            this.$http({
              url: this.$http.adornUrl(`/audio/audiomusic/info/${this.dataForm.musicId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.musicName = data.audioMusic.musicName
                this.dataForm.fileUrl = data.audioMusic.fileUrl
                this.dataForm.fileUrl2 = data.audioMusic.fileUrl2
                this.dataForm.remark = data.audioMusic.remark
                this.dataForm.createUserId = data.audioMusic.createUserId
                this.dataForm.createTime = data.audioMusic.createTime
                this.dataForm.updateTime = data.audioMusic.updateTime
                this.dataForm.state = data.audioMusic.state
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
              url: this.$http.adornUrl(`/audio/audiomusic/${!this.dataForm.musicId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'musicId': this.dataForm.musicId || undefined,
                'musicName': this.dataForm.musicName,
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
