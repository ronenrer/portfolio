(function () {
    'use strict';

    function collapseFaqRows() {
        var repeater = document.querySelector('.acf-field[data-key="field_bdevents_faq_items"] .acf-repeater');
        if (!repeater) return;

        var rows = repeater.querySelectorAll('.acf-row:not(.acf-closed)');
        rows.forEach(function (row) {
            var toggle = row.querySelector('.acf-row-handle .acf-icon, .acf-icon.-minus');
            if (toggle && row.classList && !row.classList.contains('acf-closed')) {
                toggle.click();
            }
        });
    }

    function init() {
        collapseFaqRows();
        if (typeof acf !== 'undefined' && acf.addAction) {
            acf.addAction('append', function () {
                setTimeout(collapseFaqRows, 50);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(init, 100);
        });
    } else {
        setTimeout(init, 100);
    }
})();
