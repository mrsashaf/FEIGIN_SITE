/**
 * Single source of truth for clearance level state.
 */
(function () {
    const STORAGE_KEY = 'aberration_clearance_level';
    const CHANGE_EVENT = 'feigin:clearance-granted';

    function hasLevel2() {
        return localStorage.getItem(STORAGE_KEY) === '2';
    }

    function grantLevel2() {
        localStorage.setItem(STORAGE_KEY, '2');
        emitChange();
    }

    function emitChange() {
        window.dispatchEvent(new Event(CHANGE_EVENT));
    }

    function onChange(callback) {
        if (typeof callback !== 'function') return;
        window.addEventListener(CHANGE_EVENT, callback);
    }

    window.FEIGIN_ACCESS_STATE = {
        hasLevel2,
        grantLevel2,
        emitChange,
        onChange
    };

    // Compatibility shim for existing scripts.
    window.FEIGIN_CLEARANCE = {
        hasLevel2,
        grantLevel2
    };
})();
