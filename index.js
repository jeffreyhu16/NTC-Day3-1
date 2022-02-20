const app = Vue.createApp({
    data() {
        return {
            currentTab: 'personal-form',
            tabs: ['personal-form', 'address-form', 'final-form'],
            form: {}
        }
    },
    methods: {
        updatePage(value) {
            this.currentTab = value;
        },
        updateInfo(data) {
            this.form[data.key] = data.value;
        }
    },
    computed: {
        computedForm: function() {
            if(this.currentTab == 'final-form'){
                return this.form;
            }
        }
    }
});

app.component('personal-form', {
    template: '#form1',
    data() {
        return {
            name: '',
            number: ''
        }
    },
    methods: {
        nextPage() {
            this.$emit('set-page', 'address-form');
        }
    },
    watch: {
        name: {
            handler(value) {
                this.$emit('update', {'key': 'name', 'value': value});
            }
        },
        number: {
            handler(value) {
                this.$emit('update', {'key': 'number', 'value': value});
            }
        }
    }
});
app.component('address-form', {
    template: '#form2',
    data() {
        return {
            address: ''
        }
    },
    methods: {
        nextPage() {
            this.$emit('set-page', 'final-form');
        },
        previousPage() {
            this.$emit('set-page', 'personal-form');
        }
    },
    watch: {
        address: {
            handler(value) {
                this.$emit('update', {'key': 'address', 'value': value});
            }
        }
    }
});
app.component('final-form', {
    template: '#form3',
    props: ['formData'],
    methods: {
        previousPage() {
            this.$emit('set-page', 'address-form');
        }
    }
});
app.mount('#app');