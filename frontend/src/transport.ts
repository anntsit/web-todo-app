import { Task } from './task';

type Error = string | null;

interface TasksResult {
    tasks: Task[];
    error: Error;
}

export async function getAllTasks(): Promise<TasksResult> {
    return fetch('/entities/', {
       method: 'GET',
    })
        .then((response) => response.json())
        .then((rawResult: any) => {
            const result: TasksResult = {tasks: [], error: null};

            if (rawResult.items && Array.isArray(rawResult.items)) {
                result.tasks = rawResult.items;
            }

            if (rawResult.error && typeof rawResult.err === 'string') {
                result.error = rawResult.error;
            }

            return result;
        })
        .catch((err) => ({ tasks: [], error: err.toString() }))
}

export async function createTask(id: Number, text: String): Promise<Error> {
    return fetch('/entities/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            text: text,
            author: 'Anya',
        })
    })
        .then((response) => response.json())
        .then((rawResult) => rawResult.err)
        .catch((err) => err.toString());
}


export async function deleteTask(id: Number): Promise<Error> {
    return fetch(`/entities/?id=${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((rawResult) => rawResult.err)
        .catch((err) => err.toString());
}