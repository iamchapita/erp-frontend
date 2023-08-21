import React from "react";

function InfoPage() {
	return (
		<div className="pb-16" style={{ fontFamily: '"Lato", sans-serif' }}>
			{/* Code block starts */}
			<dh-component>
				<section className="max-w-8xl mx-auto container bg-white pt-16">
					<div>
						<div
							role="contentinfo"
							className="flex items-center flex-col px-4"
						>
							<p
								tabIndex={0}
								className="focus:outline-none uppercase text-sm text-center text-gray-600 leading-4"
							>
								En pasos simples
							</p>
							<h1
								tabIndex={0}
								className="focus:outline-none text-4xl lg:text-4xl font-extrabold text-center leading-10 text-gray-800 lg:w-5/12 md:w-9/12 pt-4"
							>
								Gestiona los procesos de negocio de tu empresa
							</h1>
						</div>
						<div
							tabIndex={0}
							aria-label="group of cards"
							className="focus:outline-none mt-20 flex flex-wrap justify-center gap-10 px-4"
						>
							<div
								tabIndex={0}
								aria-label="card 1"
								className="focus:outline-none flex sm:w-full md:w-5/12 pb-20"
							>
								<div className="w-20 h-20 relative mr-5">
									<div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
									<div className="absolute text-white bottom-0 left-0 bg-custom-300 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
										<img
											src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG1.svg"
											alt="drawer"
										/>
									</div>
								</div>
								<div className="w-10/12">
									<h2
										tabIndex={0}
										className="focus:outline-none text-lg font-bold leading-tight text-gray-800"
									>
										Almacena los procesos de tu negocio
									</h2>
									<p
										tabIndex={0}
										className="focus:outline-none text-base text-gray-600 leading-normal pt-2"
									>
										Syncpro es un sistema de gestión
										empresarial que te permite administrar
										tu negocio de manera eficiente y segura.
									</p>
								</div>
							</div>
							<div
								tabIndex={0}
								aria-label="card 2"
								className="focus:outline-none flex sm:w-full md:w-5/12 pb-20"
							>
								<div className="w-20 h-20 relative mr-5">
									<div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
									<div className="absolute text-white bottom-0 left-0 bg-custom-300 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
										<img
											src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG2.svg"
											alt="check"
										/>
									</div>
								</div>
								<div className="w-10/12">
									<h2
										tabIndex={0}
										className="focus:outline-none text-lg font-semibold leading-tight text-gray-800"
									>
										Una excelente experiencia de usuario
									</h2>
									<p
										tabIndex={0}
										className="focus:outline-none text-base text-gray-600 leading-normal pt-2"
									>
										La experiencia de usuario es un factor
										clave para el éxito de cualquier
										producto. Por eso, hemos creado un
										diseño que te permite realizar tus
										tareas de manera rápida y sencilla.
									</p>
								</div>
							</div>
							<div
								tabIndex={0}
								aria-label="card 3"
								className="focus:outline-none flex sm:w-full md:w-5/12 pb-20"
							>
								<div className="w-20 h-20 relative mr-5">
									<div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
									<div className="absolute text-white bottom-0 left-0 bg-custom-300 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
										<img
											src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG3.svg"
											alt="html tag"
										/>
									</div>
								</div>
								<div className="w-10/12">
									<h2
										tabIndex={0}
										className="focus:outline-none text-lg font-semibold leading-tight text-gray-800"
									>
										Creado por desarrolladores
									</h2>
									<p
										tabIndex={0}
										className="focus:outline-none text-base text-gray-600 leading-normal pt-2"
									>
										En lugar de crear un producto que se vea
										bien, hemos creado un producto que se
										sienta bien. Cada componente ha sido
										cuidadosamente diseñado para que
										funcione perfectamente en cualquier
										dispositivo.
									</p>
								</div>
							</div>
							<div
								tabIndex={0}
								aria-label="card 4"
								className="focus:outline-none flex sm:w-full md:w-5/12 pb-20"
							>
								<div className="w-20 h-20 relative mr-5">
									<div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
									<div className="absolute text-white bottom-0 left-0 bg-custom-300 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
										<img
											src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG4.svg"
											alt="monitor"
										/>
									</div>
								</div>
								<div className="w-10/12">
									<h2
										tabIndex={0}
										className="focus:outline-none text-lg font-semibold leading-tight text-gray-800"
									>
										Diseño adaptativo
									</h2>
									<p
										tabIndex={0}
										className="focus:outline-none text-base text-gray-600 leading-normal pt-2"
									>
										Hemos creado un diseño que se adapta a
										cualquier dispositivo. Esto significa
										que puedes acceder a tu cuenta desde
										cualquier lugar y en cualquier momento.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</dh-component>
			{/* Code block ends */}
		</div>
	);
}

export default InfoPage;
