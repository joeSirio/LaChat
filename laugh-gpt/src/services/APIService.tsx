export class APIService {
    static myInstance = null;

    static getInstance(){
        return new APIService();
    }

    
    async GetJoke(user_input: string) {
        try{
            let response = await fetch('localhost:8000/api/joke/' + encodeURIComponent(user_input))
            return await response.json();
        }
        catch(error){
            console.error(error);
        }
    }
}

export default APIService