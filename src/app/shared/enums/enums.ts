export enum resetPasswordSteps {
    enterEmail = 1,
    enterConfirmationCode = 2,
    updatePassword = 3
}

export const ErrorMessagesEN = [
    {id:1 , EnError : 'Phone Number Already Exists' , ARError :'رقم الهاتف مستخدم'},
    {id:2 , EnError : 'Email Already Exists' , ARError :'البريد الالكتروني مستخدم'},
    {id:3 , EnError : 'UserName Already Exists' , ARError :'الاسم مستخدم من قبل'},
    {id:4 , EnError : 'Invalid External Authentication' , ARError :'مصادقة خارجية غير صالحة'},
    {id:5 , EnError : 'File length is not valid' , ARError :'حجم الملف غير صالح'},
    {id:6 , EnError : 'File extention is not valid' , ARError :'صيغة الملف غير مقبولة'},
]
