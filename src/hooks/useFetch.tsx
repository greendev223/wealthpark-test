import { useState, useEffect } from 'react'
/**
 * This is a customized hook to fetch hacker datas with Promise.all method
 * @param endPoints default url list
 * @returns 
 */
export const useFetch = (endPoints: string[]) => {
    const [urls, setUrls] = useState<string[]>(endPoints)
    const [data, setData] = useState<any[]>([])
    const [errors, setErrors] = useState<any[]>([])
    const [isSuccessed, setSuccessed] = useState<boolean>(false)

    const fetchData = async () => {
        const _errors: any[] = []

        const responses = await Promise.all(urls.map(async url => {
            try {
                const resp = await fetch(url)
                const json = await resp.json()
                return json
            } catch (error) {
                _errors.push(error)
            }
        }))
        if (_errors.length === 0) {
            setData(responses)
            setSuccessed(true)
        }
        else {
            setErrors(_errors)
        }
    }

    useEffect(() => {
        setSuccessed(false)
        setErrors([])

        fetchData()
    }, [urls])

    return { data, errors, isSuccessed, setUrls }
}