import React, { useState } from "react";

type FormJSON = Record<string, any>;

export type FormComponentProps = {
	onSubmit: (data: FormJSON) => void;
	onCancel: () => void;
};

/**
 * form에 입력한 데이터를 검색해서 JSON 객체로 반환
 */
const formToJSON = (elements: HTMLFormControlsCollection): FormJSON => {
	return Array.from(elements).reduce((data, element: any) => {
		if (element.name) {
			const value = element.type === "checkbox" ? element.checked : element.value;
			return {
				...data,
				[element.name]: value,
			};
		}
		return { ...data };
	}, {} as FormJSON);
};

function FormComponent({ onSubmit, onCancel }: FormComponentProps) {
	const [isOver21, setIsOver21] = useState<boolean>(false);

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const data = formToJSON(form.elements);

		onSubmit(data);
	};

	const handleIsOver21Change = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const checkbox = target as HTMLInputElement;
		setIsOver21(checkbox.checked);
	};

	return (
		<form id="myForm" name="myForm" onSubmit={handleFormSubmit}>
			<h1>React UI Test</h1>
			<div>
				<label htmlFor="first_name">입력1</label>
				<input type="text" id="first_name" name="first_name" />
			</div>
			<div>
				<label htmlFor="last_name">입력2</label>
				<input type="text" id="last_name" name="last_name" />
			</div>
			<div>
				<label htmlFor="is_over_21">조건1</label>
				<input type="checkbox" id="is_over_21" name="is_over_21" checked={isOver21} onChange={handleIsOver21Change} />
			</div>
			{isOver21 && (
				<div>
					<label htmlFor="favorite_drink">조건2</label>
					<input type="text" id="favorite_drink" name="favorite_drink" />
				</div>
			)}
			<button type="button" onClick={onCancel}>
				취소
			</button>
			<button type="submit">적용</button>
		</form>
	);
}

export default FormComponent;
