import React from 'react';
import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched  //проверяем, не валидный ли контроль.  если НЕ валидированый контроль, и если мы должны его валидировать, и если мы его уже потрогали то это значит что он не валидный у нас 
}//не для всех будет настроена валидация 

const Input = (props) => {

    const inputType = props.type || 'text';
    const htmlFor = `${props.type}-${Math.random()}` //будет генерироватся случайная уникальная строка по типу 'text-0.4324' | тип 
    const className = ['Input']
    
    if(isInvalid(props)) { //проверка на ошибку 
        className.push('problem')
    }
    return (
        <div className={className.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />

            {
                isInvalid(props) ? <span>{props.errorMessage || 'Please enter data'}</span> : null /*если есть проблема, выведет сообщение errorMessage или 'Please enter data.  Если все ок ничего не выведет */
            }
            
        </div>
    ) //v label должно совпадать htmlFor с id inputa. они таким образом связаны друг-с-другом
}

export default Input;