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
        placeholder="Search YouTube or Soundcloud..."
        onChange={this.updateQuery}
      />
    );
  }
}

const StyledSearchBar = styled.input`
  background-color: #aaaaaa;
  border: 0;
  border-radius: 0.25rem;
  box-sizing: border-box;
  color: #000000;
  display: block;
  font-size: 1rem;
  outline: none;
  margin: 0.5rem;
  padding: 0.375rem 0.75rem;
  position: relative;
  width: calc(100% - 1rem);

  &::placeholder {
    color: #3c3c3c;
  }
`;
