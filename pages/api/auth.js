export const setSession = (session)=>{localStorage.setItem('key', session)};
export const setGrupo = (grupo)=>{localStorage.setItem('grupo', grupo)};
export const getGrupo = async ()=>{return localStorage.getItem('grupo')};
export const isLogged = ()=>{return localStorage.getItem('key')};

