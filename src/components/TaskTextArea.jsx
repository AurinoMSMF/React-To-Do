function TaskTextArea(props) {
  return (
    <textarea
      data-test="task-description-textarea"
      className="rounded-md border border-green-200 outline-red-600 px-4 py-2"
      {...props} // Desestrutura todas as props para dentro do elemento (spread)
    ></textarea>
  );
}

export default TaskTextArea;
