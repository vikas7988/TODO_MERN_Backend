import Todo from '../database/model/todoModel.js';

export async function getTodos(req, res) {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    }
}


export async function addTodo(req, res) {
    const { name } = req.body;
    try {
        const todo = new Todo({ itemName:name, user: req.user.id });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
}

export async function updateTodo(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(id, { itemName:name, }, { new: true });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
}


export async function deleteTodo(req, res) {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
}
