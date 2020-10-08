export function createControl(config, validation){
    return {
        ...config,//разворачиваем  config, так как там может быть много разных полей оп разному названы 
        validation,
        valid: !validation, //если в validation что-то есть, значин он тру, а тут он будет false, тоесть если что-то есть в validation то нужно будет что-то делать 
        touched: false,
        value: ''
    
    }
}