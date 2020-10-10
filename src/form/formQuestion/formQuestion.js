export function createControl(config, validation){
    return {
        ...config,//разворачиваем  config, так как там может быть много разных полей оп разному названы 
        validation,
        valid: !validation, //если в validation что-то есть, значин он тру, а тут он будет false, тоесть если что-то есть в validation то нужно будет что-то делать 
        touched: false,
        value: ''
    
    }
}


export function validate(value, validation = null ) {
    if(!validation) {
        return true;
    } 

    let isValid = true;

    if(validation.required) {
        isValid = value.trim() !== '' && isValid;
    }


    return isValid;
}

export function validateForm(formControls) {
    let isFormValid = true;

    for(let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}