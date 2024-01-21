document.addEventListener('alpine:init', () => {
    Alpine.data('app', (name) => {
        return {
            init() {
                this.fetchHandle(name, () => {
                    document.getElementById('app').classList.remove('hidden');
                });
            },
            loading: true,
            modal: false, 
            modalContent: '',
            user: null,
            skills: [],
            socials: [],
            portfolios: [],
            fetchHandle: function (handle, callback) {
                fetch('https://tree.yourchocomate.one/api/handle/' + handle)
                .then(response => response.json())
                .then(data => {
                    this.loading = false;
                    this.user = data.user;
                    this.skills = data.handles.skill;
                    this.socials = data.handles.social;
                    this.portfolios = data.handles.portfolio;
                    if (callback) callback();
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