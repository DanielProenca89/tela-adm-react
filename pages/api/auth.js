export const setSession = (session)=>{localStorage.setItem('key', session)};
export const setGrupo = (grupo)=>{localStorage.setItem('grupo', grupo)};
export const getGrupo = ()=>{return localStorage.getItem('grupo')};
export const isLogged = ()=>{return localStorage.getItem('key')};

