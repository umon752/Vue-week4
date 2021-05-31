import {
    createApp
} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';
import resMessage from './component/resMessage.js';
import pagination from './component/pagination.js';
import updateProductModal from './component/productModal.js';
import delProductModal from './component/delModal.js';

let productModal = {};
let delModal = {};

const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io',
            path: 'umon752',
            productsData: [],
            productObj: {
                imagesUrl: [],
            },
            modalObj: {
                modalTitle: '',
                imgInputIsShow: false
            },
            resObj: {
                resMessage: '',
                isShowReaMessage: false
            },
            pagination: {}
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
        getProductsData(page = 1) {
            const url = `${this.url}/api/${this.path}/admin/products?page=${page}`;
            axios.get(url)
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data);
                        this.productsData = res.data.products;
                        this.pagination = res.data.pagination;
                    } else {
                        // 轉址到 signIn.html
                        window.location = 'signIn.html';
                        // 顯示訊息
                        this.resMessage('尚未登入，請重新登入');
                    }
                }).catch((error) => {
                    console.log(error);
                });
        },
        openModal(status, item) {
            if (status === 'delete') {
                delModal.show();
                this.productObj = {
                    ...item
                };
            } else if (status === 'edit') {
                productModal.show();
                this.productObj = {
                    ...item
                };
                this.modalObj.modalTitle = '編輯';
            } else if (status === 'create') {
                productModal.show();
                // 清空 input 內容
                this.productObj = {
                    imagesUrl: []
                };
                this.modalObj.modalTitle = '建立';
            }
        },
        delProductData(productObj) {
            const url = `${this.url}/api/${this.path}/admin/product/${productObj.id}`;
            axios.delete(url)
                .then((res) => {
                    if (res.data.success) {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                        this.getProductsData();
                    } else {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            delModal.hide();
        },
        updateProductData(productObj) {
            // 建立
            let url;
            let method;
            let resFalseText;

            // 編輯
            if (this.modalObj.modalTitle === '編輯') {
                url = `${this.url}/api/${this.path}/admin/product/${productObj.id}`;
                method = 'put';
                resFalseText = `res.data.message`;
            } else if (this.modalObj.modalTitle === '建立') {
                url = `${this.url}/api/${this.path}/admin/product`;
                method = 'post';
                resFalseText = '欄位未填完成';
            }

            axios[method](url, {
                    data: productObj
                })
                .then((res, resFalseText) => {
                    if (res.data.success) {
                        // 顯示訊息
                        this.resMessage(res.data.message);
                        this.getProductsData();
                        productModal.hide();
                    } else {
                        // 顯示訊息
                        this.resMessage(resFalseText);
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }

    },
    // mounted() 為畫面初始化之後，重新擷取 DOM 元素
    mounted() {
        // 取出儲存在瀏覽器 cookie 裡面的 token 憑證
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = token;
        // 取得產品資料
        this.getProductsData();
        // Bootstrap modal 實體化
        productModal = new bootstrap.Modal(document.querySelector('#productModal'));
        delModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
    },
    components: {
        resMessage,
        pagination,
        updateProductModal,
        delProductModal
    }
});
app.mount('#app')