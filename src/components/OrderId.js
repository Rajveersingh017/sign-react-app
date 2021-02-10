const randomOrderId = () =>{
    let orderId = "OD-" + Math.random().toString(36).substr(2,9);
    return orderId;
}