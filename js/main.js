document.addEventListener('alpine:init', () => {
    Alpine.data('app', (name) => {
        return {
            init() {
                this.fetchHandle(name);
            },
            loading: true,
            modal: false, 
            modalContent: '',
            user: null,
            socials: [],
            portfolios: [],
            fetchHandle: function (handle) {
                fetch('https://tree.yourchocomate.one/api/handle/' + handle)
                .then(response => response.json())
                .then(data => {
                    this.loading = false;
                    this.user = data.user;
                    this.socials = data.handles.social;
                    this.portfolios = data.handles.portfolio;
                })
            },
            checkIfURL: function(string) {
                try {
                    new URL(string);
                } catch (_) {
                    return false;
                }
            
                return true;
            }
        }
    })

    Alpine.directive('heroicon', (el, { expression }, { evaluate }) => {
        const classvalues = el.getAttribute('class');
        const name = evaluate(expression).toString().trim();
        fetch(`https://raw.githubusercontent.com/yourchocomate/heroicons-svg/main/svg/${name}.svg`)
        .then(response => response.text())
        .then(data => {
            el.outerHTML = classvalues?.length > 0 ? data.replace('<svg', `<svg class="${classvalues}"`) : data;
        })

    })
})