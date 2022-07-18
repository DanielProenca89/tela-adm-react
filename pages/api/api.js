export const api = async (params, route)=>{

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    const response = await (await fetch(`http://194.195.86.239:8080/api/${route}`, requestOptions)).json();
    return response[0].data;

      
}
