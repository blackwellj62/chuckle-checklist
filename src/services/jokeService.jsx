

export const getAllJokes = async () => {
    const response = await fetch('http://localhost:8088/jokes')
    const jokes = await response.json()
    return jokes
}

export const postNewJoke = async (text) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text,
            told: false
        })
    }
    const response = await fetch('http://localhost:8088/jokes', postOptions)

}

export const editJoke = async (changedJoke, id) => {
    const editOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            changedJoke
        )
    }
    await fetch(`http://localhost:8088/jokes/${id}`, editOptions)
}

export const deleteJoke = async (deletedJoke, id) => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            deletedJoke
        )
    }
    await fetch(`http://localhost:8088/jokes/${id}`, deleteOptions)  
}