export interface Order{
    id_order:number, 
    user_id:number, 
    id_product:number, 
    name:string, 
    order_number:number[], 
    date:string, 
    is_completed:boolean
}