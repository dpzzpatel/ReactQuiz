export async function fetchQuestion(){
    try{
        var response = await fetch('https://opentdb.com/api.php?amount=1');
        if(!response.ok)
            throw new Error('Network error:Failed to fetch question');
        return await response.json();
    }catch(err){
        alert(err);
        return null;
    }
}