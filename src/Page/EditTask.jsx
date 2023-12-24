

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axios";

function EditTask() {
	const { id } = useParams();
	const pDOM = useRef();
	const inputDOM = useRef();
	const checkDOM = useRef();

	const [formStatus, setFormStatus] = useState({
		formMsg: "",
		formSuccess: true,
	});

	function formStatusLogic(msg, status) {
		setFormStatus({
			formMsg: msg,
			formSuccess: status,
		});
		setTimeout(() => {
			setFormStatus({
				formMsg: "",
				formSuccess: true,
			});
		}, 3000);
	}

	async function fetchSingleTask() {
		try {
			const { data } = await axios(`/task/${id}`);
			console.log(data[0]);
			pDOM.current.textContent = data[0].id;
			inputDOM.current.value = data[0].task_name;
			checkDOM.current.checked = data[0].completed;
		} catch (error) {
			console.log(error);
			formStatusLogic("Something went wrong", false);
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await axios.patch(`/task/${id}`, {
				name: inputDOM.current.value,
				completed: checkDOM.current.checked,
			});
			fetchSingleTask();
			formStatusLogic("Task edited successfully", true);
		} catch (error) {
			console.log(error);
			formStatusLogic("Something went wrong", false);
		}
	}

	useEffect(() => {
		fetchSingleTask();
	}, []);

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className="single-task-form">
				<h4>Edit Task</h4>
				<div className="form-control">
					<label htmlFor="taskId">Task ID</label>
					<p ref={pDOM} className="task-edit-id" autoComplete="off"></p>
				</div>
				<div className="form-control">
					<label htmlFor="name">Name</label>
					<input
						ref={inputDOM}
						type="text"
						id="name"
						name="name"
						className="task-edit-name"
						autoComplete="off"
					/>
				</div>
				<div className="form-control">
					<label htmlFor="completed">Completed</label>
					<input
						ref={checkDOM}
						type="checkbox"
						id="completed"
						name="completed"
						className="task-edit-completed"
						autoComplete="off"
					/>
				</div>
				<button type="submit" className="block btn task-edit-btn">
					Edit
				</button>
				<div
					className={`form-alert ${
						formStatus.formSuccess ? "alert-success" : "alert-danger"
					}`}
				>
					{formStatus.formMsg}
				</div>
			</form>
			<Link to="/" className="btn back-link">
				Back to Tasks
			</Link>
		</div>
	);
}

export default EditTask;
