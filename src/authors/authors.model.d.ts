export interface authorDTO
{
    id:number;
    name:string;
    biography:string;
    dateofBirth:Date;
    picture:string;
}
export interface authorCreationDTO{
    name:string;
    biography?:string;
    dateOfBirth?: Date;
    picture?:File;
    pictureURL?:string;

}