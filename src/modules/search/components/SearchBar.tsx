import * as React from 'react';
import styled from 'styled-components';

interface $Props {
	query: string;
	onChange(query: string): void;
}

// Hack to make typing feel faster. Having the query flow through the whole mutation process
// takes almost 120ms, but doing a local state update takes 5ms
// Would be nice to do some performance auditing and find exactly why the update is so slow
// but this is fine for now (and likely forever)
export default class SearchBar extends React.Component<$Props> {
	state = {
		query: this.props.query
	};

	updateQuery = ({target: {value: query}}: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({query});
		setTimeout(() => this.props.onChange(query), 0);
	};

	render() {
		return (
			<StyledSearchBar
				data-id="search-bar-target"
				type="text"
				value={this.state.query}
				autoFocus
				placeholder="Start typing..."
				onChange={this.updateQuery}
			/>
		);
	}
}

const StyledSearchBar = styled.input`
	background-color: rgb(30, 24, 31);
	border: 0;
	border-radius: 0;
	box-sizing: border-box;
	color: #f2f2f2;
	display: block;
	font-size: 1.25rem;
	outline: none;
	padding: 1rem 0.5rem 1rem 2.25rem;
	position: relative;
	width: 100%;
	caret-color: rgb(156, 77, 157);

	&::placeholder {
		color: rgb(163, 163, 163);
	}
`;
