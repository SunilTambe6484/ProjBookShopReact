export interface authenticationModel
{
    email:string;
    password:string;
}
export interface claim{
    name:string;
    value:string;
}

export interface loginResponse{
    token: string;
    expiryToken: Date;
}