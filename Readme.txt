En el archivo AppContext agregar el siguiente estado:

const [token, setToken] = useState();

y pasarlo en el provider de la linea 28:

return <Provider value={{ data, loading, error,token,setToken, setData }}>{children}</Provider>