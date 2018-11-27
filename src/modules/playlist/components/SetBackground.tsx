import Vibrant from 'node-vibrant';
import * as React from 'react';

import {$Track} from '../../search/components/types';

interface $Props {
	track: $Track | undefined;
}

export default function SetBackground({track}: $Props) {
	React.useEffect(
		() => {
			if (track) {
				const thumb = document.querySelector(`img[data-id="${track.info.id}"]`) as HTMLImageElement;
				const vibrant = new Vibrant(thumb);
				vibrant
					.getPalette()
					.then(
						({Muted: {r, g, b}}: any) =>
							(document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`)
					);
			} else {
				document.body.style.backgroundColor = `rgb(25, 25, 25)`;
			}
		},
		[track && track.id]
	);

	return null;
}
