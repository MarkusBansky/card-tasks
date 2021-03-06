import Task from "../models/Task";

const LISTS = 'lists';
const LIST_ = 'list_';

export function getAvailableLists() {
    let lists = localStorage.getItem(LISTS);
    if (lists == null) {
        return [] as string[];
    }
    return JSON.parse(lists) as string[];
}

export function createNewTaskList(name: string) {
    let lists = getAvailableLists();
    lists.push(name.replace(" ", "_"));
    localStorage.setItem(LISTS, JSON.stringify(lists));
}

export function getTasksFromList(name: string): Task[] {
    let lists = localStorage.getItem(LIST_ + name.replace(" ", "_"));
    if (lists == null) {
        return [];
    }
    return JSON.parse(lists).map((item: any) => new Task(item));
}

export function updateTasksFromList(name: string, tasks: Task[]) {
    localStorage.setItem(LIST_ + name.replace(" ", "_"), JSON.stringify(tasks));
}

export function deleteTasksList(name: string) {
    let lists = getAvailableLists();
    const newLists = lists.filter(l => l !== name);
    localStorage.setItem(LISTS, JSON.stringify(newLists));
    localStorage.removeItem(LIST_ + name.replace(" ", "_"));
}