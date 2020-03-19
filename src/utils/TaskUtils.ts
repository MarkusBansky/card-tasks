export async function fetchAvailableTasksList() {
    return (await fetch(`tasks_list.json`)).json();
}

export function createNewTaskList(name: string) {

}

export async function fetchTasksFrom(name: string) {
    return (await fetch(`tasks/${name}.json`)).json();
}

export function deleteTasksList(name: string) {

}