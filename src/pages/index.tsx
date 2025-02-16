import { FC } from "react";
import MainLayout from "../components/layout/MainLayout";

const HomePage: FC = () => {
	return (
		<>
			<MainLayout>
				<div className="bg-white w-full h-full text-black">
					Test Pierwszego deploymentu
				</div>
			</MainLayout>
		</>
	);
};

export default HomePage;
