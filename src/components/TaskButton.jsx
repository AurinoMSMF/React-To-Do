function TaskButton(props) {
  return (
    <button {...props} className="text-2xl p-2 rounded-md bg-green-400">
      {props.children}
    </button>
  );
}

export default TaskButton;
