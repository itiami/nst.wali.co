
function checkDarkThemePreference() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyDarkTheme() {
    if (checkDarkThemePreference()) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}
applyDarkTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    applyDarkTheme();
});