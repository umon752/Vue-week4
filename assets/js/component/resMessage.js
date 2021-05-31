export default {
    props: ['resText', 'resIsShow'],
    template: `<div class="resMessage alert alert-light shadow rounded-pill fw-bold text-secondary text-center" role="alert" :class="{active: resIsShow}">
    {{ resText }}
</div>`
};