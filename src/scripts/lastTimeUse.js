function lastTimeUse(lastTime, lang = 'EN') {
    let today = new Date().getTime();
    let last = lastTime;
    if (lang === 'EN') {
        let used = '';
    
        let day = today - 86400000;
        let threeDays = today - 259200000;
    
        if (last <= day) {
            used = 'recently';
        } else if (last <= threeDays) {
            used = 'a long time ago';
        } else {
            used = 'recently';
        }

        return used;
    } else if (lang === 'RU') {
        let used = '';
    
        let day = today - 86400000;
        let threeDays = today - 259200000;
    
        if (last <= day) {
            used = 'недавно';
        } else if (last <= threeDays) {
            used = 'давно';
        } else {
            used = 'недавно';
        }

        return used;
    }
} 

module.exports = lastTimeUse;