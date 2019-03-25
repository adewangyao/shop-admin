      addFormRules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      },

            addFormRules: {
        username: [
          {
            validator: userVaild,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: passVaild,
            triggrt: 'blur'
          }
        ],
        email: [
          {
            type: email,
          }
        ],
        mobile: [
          {
            type: number,
            len: 13
          }
        ]
      },
