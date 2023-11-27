export interface AccountInfoType {
    username : string,
    email : string,
    birthday : string,
    nickname : string,
    phone : string
}

export interface AccountPasswordType {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
