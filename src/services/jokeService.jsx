export const getAllJokes = async () => {
    const response = await fetch('http://localhost:8088/jokes')
    const jokes = await response.json()
    return jokes
}

export const postNewJoke = async (state) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            state,
            told: false
        })
    }
    const response = await fetch('http://localhost:8088/jokes', postOptions)

}