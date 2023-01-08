export const validation = {
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/,
    phone: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,

}

export const validationMessages = {
    isRequired: "Поле обязательно для заполнения",
    incorrectEmail: "Некорректный email",
    incorrectPassword: "Пароль должен состоять из цифр, а так же строчных и заглавных букв латинского алфафита",
    incorrectConfirmPassword:"Пароли не совпадают",
}

export const validationHelpers = {
    getMaxLengthMessage(value:number){
        return {value, message:`Длина поля больше ${value} символов`}
    },
    getMinLengthMessage(value:number){
        return {value, message:`Длина поля меньше ${value} символов`}
    },
    confirmPasswords(pass:string, confirmPass:string){
        return pass!==confirmPass? validationMessages.incorrectConfirmPassword : true
    }
}