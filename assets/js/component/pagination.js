export default {
    props: ['page'],
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center justify-content-md-start">
        <li class="page-item" :class="{'disabled' : !page.has_pre}">
            <a class="page-link d-flex px-2" href="#" aria-label="Previous" @click.prevent="$emit('get-product', page.current_page - 1)">
                <span class="material-icons">
                    chevron_left
                </span>
            </a>
        </li>
        <li class="page-item" :class="{'active' : item === page.current_page}" v-for="item in page.total_pages" :key="item">
        <a class="page-link" href="#" @click.prevent="$emit('get-product', item)">{{item}}</a>
        </li>
        <li class="page-item" :class="{'disabled' : !page.has_next}">
            <a class="page-link d-flex px-2" href="#" aria-label="Next" @click.prevent="$emit('get-product', page.current_page + 1)">
                <span class="material-icons">
                    navigate_next
                </span>
            </a>
        </li>
    </ul>
</nav>`
};