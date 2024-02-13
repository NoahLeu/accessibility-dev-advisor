import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
	initialShowModal?: boolean;
};

const InformationModal = ({ initialShowModal }: Props) => {
	const [showModal, setShowModal] = useState(initialShowModal || false);

	return (
		<>
			<button
				className="bg-primary text-white text-2xl font-bold p-2 rounded-full z-40 absolute top-10 right-10 aspect-square h-12 w-12"
				onClick={() => setShowModal(true)}
			>
				i
			</button>

			<div
				className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 items-center justify-center"
				style={{ display: showModal ? "flex" : "none" }}
				onClick={() => setShowModal(false)}
				aria-hidden={!showModal}
				aria-label="Close information modal"
			>
				<div
					className="flex flex-col items-center justify-center max-w-4xl"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="bg-backgroundLight p-10 rounded-lg">
						<h1 className="text-4xl font-bold mb-2">Information</h1>
						<p>
							This tool will guide you through a series of questions about your
							project. The questions are designed to help you identify the
							accessibility requirements that are relevant to your mobile
							application project. After finishing the result will be a list of
							requirements that are sorted based on your answers to the
							questions. The most relevant requirements to implement are at the
							top. Keep in mind that this tool only provides software-based
							accessibility advice. It is recommended to also perform manual
							accessibility testing with real users under real conditions. The
							list is based on the{" "}
							<Link
								target="_blank"
								className="underline text-primary"
								to="https://www.w3.org/TR/WCAG22/"
							>
								WCAG 2.2
							</Link>
							,{" "}
							<Link
								target="_blank"
								className="underline text-primary"
								to="https://www.w3.org/TR/ATAG20/"
							>
								ATAG 2.0
							</Link>
							,{" "}
							<Link
								target="_blank"
								className="underline text-primary"
								to="https://www.w3.org/TR/UAAG20/"
							>
								UAAG 2.0
							</Link>
							, and{" "}
							<Link
								target="_blank"
								className="underline text-primary"
								to="https://developer.apple.com/design/human-interface-guidelines/accessibility"
							>
								Apple's accessibility guidelines
							</Link>
							.
						</p>
						<button
							onClick={() => setShowModal(false)}
							className="bg-primary hover:bg-primary/70 text-white font-bold py-4 px-4 rounded w-full mt-4"
						>
							Got it
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default InformationModal;
