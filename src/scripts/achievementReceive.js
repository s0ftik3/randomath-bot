function achievementReceive(trueAnswers, falseAnswers, lang = 'EN') {
    let correct = trueAnswers;
    let incorrect = falseAnswers;

    if (lang === 'EN') {
        let done = '✅';
        let locked = '🔒';
        
        let first = locked;
        let second = locked;
        let third = locked;
        let fourth = locked;
        let fifth = locked;
        let sixth = '\n' + locked + ` *Unstoppable* — give 200 correct answers with less than 25 mistakes. _(extra achievement)_`;
    
        if (correct > 0) {
            first = done;
        }
        
        if (correct >= 41) {
            second = done;
        }
        
        if (correct >= 91) {
            third = done;
        }
        
        if (incorrect >= 25) {
            fourth = done;
        }
        
        if (correct >= 500) {
            fifth = done;
        }
        
        if (correct >= 200 && incorrect < 25) {
            sixth = '\n' + done + ` *Unstoppable* — give 200 correct answers with less than 25 mistakes.`;
        }
        
        if (correct >= 200 && incorrect >= 25) {
            sixth = '';
        }

        return { first, second, third, fourth, fifth, sixth }
    } else if (lang === 'RU') {
        let done = '✅';
        let locked = '🔒';
        
        let first = locked;
        let second = locked;
        let third = locked;
        let fourth = locked;
        let fifth = locked;
        let sixth = '\n' + locked + ` *Неудержимый* — дать 200 верных ответов и допустить менее чем 25 ошибок. _(специальное достижение)_`;

        if (correct > 0) {
            first = done;
        }
        
        if (correct >= 41) {
            second = done;
        }
        
        if (correct >= 91) {
            third = done;
        }
        
        if (incorrect >= 25) {
            fourth = done;
        }
        
        if (correct >= 500) {
            fifth = done;
        }
        
        if (correct >= 200 && incorrect < 25) {
            sixth = '\n' + done + ` *Неудержимый* — дать 200 верных ответов и допустить менее чем 25 ошибок. _(специальное достижение)_`;
        }
        
        if (correct >= 200 && incorrect >= 25) {
            sixth = '';
        }

        return { first, second, third, fourth, fifth, sixth }
    }
}

module.exports = achievementReceive;