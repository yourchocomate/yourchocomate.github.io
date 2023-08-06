document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => {
        return {
            loading: true,
            user: null,
            socials: [],
            portfolios: [],
            fetchHandle: function (url, callback) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => callback(data))
            },
            fetchData: function () {
                this.fetchHandle('https://tree.yourchocomate.one/api/handle/yourchocomate', (data) => {
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
        fetch(`icons/svg/${name}.svg`)
        .then(response => response.text())
        .then(data => {
            el.outerHTML = classvalues?.length > 0 ? data.replace('<svg', `<svg class="${classvalues}"`) : data;
        })

    })
})