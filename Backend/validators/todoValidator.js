const validateTodo = (data, isUpdate = false) => {
    const { title, description, category, priority, userId, completed } = data;
    
    if (!isUpdate && !title) {
        const error = new Error("Başlık zorunludur.");
        error.status = 400;
        throw error;
    }

    return {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category: category || "genel" }),
        ...(priority && { priority: priority || "medium" }),
        ...(userId && { userId }),
        ...(typeof completed === 'boolean' && { completed })
    };
};

module.exports = { validateTodo }; 