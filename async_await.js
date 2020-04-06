//write a function to retreive a blob of json
// make an ajax request! use the 'fetch' function

//--test link for fetching json blob
//http://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums(){
//     fetch('http://rallycoding.herokuapp.com/api/music_albums')
//     //fetch returns a promise which is resolved an object that represents the underline request
//     //when the promise is resolved we chain a then
//     .then( res=> res.json()) //response shorter res.
//     //Now again a promise is returned for res.json() when it completes then we have data as json
//     .then(json => console.log(json))
// }

// - add async with function
// - then identify all promises created in this function
// - in front of these promises we would use word 'await'
async function fetchAlbums(){
    const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
    const json =  await res.json() //response shorter res.
    
    console.log(json)
}
// - async can also be used with arrow functions like
const fetchAlbums = async() => {
    const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
    const json =  await res.json() //response shorter res.
    
    console.log(json)
}

fetchAlbums();