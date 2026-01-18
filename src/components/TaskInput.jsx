function TaskInput(props) {
  return (
    <input
      className="rounded-md border border-green-200 outline-green-600 px-4 py-2"
      name={props.name}
      type={props.description}
      placeholder={props.placeholder}
      value={props.title}
      onInput={props.onInput}
    />
  );
}

export default TaskInput;
