import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';
import resMessage from './component/resMessage.js';

const url = 'https://vue3-course-api.hexschool.io';

const app = createApp({
    data() {
        return {
            userObj: {
                username: '',
                password: ''
            },
            passwordStatus: 'password',
            cookie: {
                token: '',
                expired:'',
            },
            resObj: {
                resMessage: '',
                isShowReaMessage: false
            }
        };
    },
    methods: {
        resMessage(text) {
            // 顯示訊息
            this.resObj.isShowReaMessage = true;
            setTimeout(() => {
                this.resObj.isShowReaMessage = false;
            }, 1000);
            this.resObj.resMessage = text;
        },
        changePasswordStatus() {
            if (this.passwordStatus === 'password') {
                this.passwordStatus = 'current-password';
            } else {
                this.passwordStatus = 'password';
            }
        },
        signIn() {
            const completeUrl = `${url}/admin/signin`;
            axios.post(completeUrl, this.userObj)
                .then((res) => {
                    if (res.data.success) {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                        // 轉址到 admin.html
                        window.location = 'admin.html';

                        this.cookie.token = res.data.token;
                        this.cookie.expired = res.data.expired;
                        // 將 token 存入 cookie 內
                        document.cookie = `hexToken=${this.cookie.token}; expires=${new Date(this.cookie.expired)}`;
                    } else {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    }
                    // 清除 input 內容
                    this.userObj.username = '';
                    this.userObj.password = '';
                }).catch((error) => {
                    console.log(error);
                });
        }
    },
    components: {
        resMessage
    }
});
app.mount('#app')