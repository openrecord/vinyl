import * as React from 'react';
import styled from 'styled-components';

export default function Spinner() {
	return (
		<StyledSpinner>
			<SpinnerSVG />
		</StyledSpinner>
	);
}

const StyledSpinner = styled.div`
	text-align: center;

	svg {
		animation: spin 1.5s linear infinite;
		width: 3rem;
	}

	path#Fill-2 {
		stroke: #008dff;
		fill: #008dff;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(-360deg);
		}
	}
`;

const SpinnerSVG = () => (
	<svg viewBox="0 0 324 324" version="1.1">
		<defs>
			<linearGradient
				x1="2.45111609%"
				y1="86.5423307%"
				x2="97.3870835%"
				y2="21.6896955%"
				id={'linearGradient-1'}
			>
				<stop stopColor="#FFFFFF" offset="0%" />
				<stop stopColor="#FFFFFF" stopOpacity="0" offset="100%" />
			</linearGradient>
		</defs>
		<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			<g id="Loading" transform="translate(1.000000, 0.000000)">
				<g id="Page-1">
					<g id="Group-9" transform="translate(0.000000, 0.764552)">
						<path
							d="M31.7037836,66.1508738 C84.1128881,-5.28495277 184.485575,-20.6733503 255.878261,31.7674231 C327.270948,84.2081965 342.674082,184.641535 290.240948,256.077361 C237.831843,327.513188 137.459157,342.901585 66.0664701,290.460812 C-5.32621642,238.020038 -20.7053209,137.5867 31.7037836,66.1508738 M306.869604,161.12614 C306.869604,80.5053633 241.55647,15.1527627 160.984381,15.1527627 C80.412291,15.1527627 15.0991567,80.5053633 15.0991567,161.12614 C15.0991567,241.746916 80.412291,307.099517 160.984381,307.099517 C241.55647,307.099517 306.869604,241.746916 306.869604,161.12614"
							id="Fill-2"
							strokeWidth="2.4"
							opacity="0.7"
						/>
						<g id="Group-8" transform="translate(42.452736, 1.599010)">
							<path
								d="M140.782565,2.32575279 L139.220625,13.3621191 C102.93555,8.21662371 66.5062965,16.8004642 36.7092816,36.6611147 C35.7721174,32.7418822 33.7295801,29.6642027 30.53361,27.4040319 C62.5894308,6.02858594 101.758088,-3.20445256 140.782565,2.32575279 Z"
								id="Fill-4"
								fill="url(#linearGradient-1)"
								opacity="0.7"
							/>
							<path
								d="M36.7100025,36.660153 L36.7100025,36.6841973 C26.5934353,43.3925769 17.2217935,51.4474412 8.90746517,60.7045241 C5.08671891,59.3339949 2.32328607,56.8574247 0.641196517,53.250769 C9.60433085,43.2963994 19.6488085,34.6644702 30.5343308,27.4030701 C33.730301,29.663241 35.7728383,32.7409205 36.7100025,36.660153"
								id="Fill-6"
								fill="#FFFFFF"
							/>
						</g>
					</g>
				</g>
			</g>
		</g>
	</svg>
);
