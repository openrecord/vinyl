import {DocumentNode} from 'graphql';

declare module '*.graphql' {
	const content: DocumentNode;
	export default content;
}
