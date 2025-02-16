import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLink from "./NavLink";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

interface NavItem {
	label: string;
	href: string;
}

const navItems: NavItem[] = [
	{
		label: "main",
		href: "/",
	},
];

const Navbar: FC = () => {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const controlNavbar = () => {
		if (isMobileMenuOpen) {
			setIsVisible(true);
		} else {
			if (window.scrollY < window.innerHeight * 0.3) {
				setIsVisible(true);
			} else if (window.scrollY > lastScrollY) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
		}
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY, isMobileMenuOpen]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	useEffect(() => {
		// Fix dla wysokosci mobilnej (vh)
		const setVh = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		};
		setVh();
		window.addEventListener("resize", setVh);
		return () => {
			window.removeEventListener("resize", setVh);
		};
	}, []);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isMobileMenuOpen]);

	const iconVariants = {
		closed: { rotate: 0 },
		open: { rotate: 90 },
	};

	return (
		<>
			<motion.nav
				className={`fixed w-full z-50 shadow-none md:shadow-none xl:shadow-none bg-[#878787] md:bg-[#878787] xl:bg-[#878787] bg-opacity-100 md:bg-opacity-100 xl:bg-opacity-100 backdrop-blur-0 md:backdrop-blur-0 xl:backdrop-blur-0 border-[#000000] md:border-[#000000] xl:border-[#000000] border-solid md:border-solid xl:border-solid border-0 md:border-0 xl:border-0 rounded-b-1 md:rounded-b-0 xl:rounded-b-0 h-[4.6rem] md:h-[4.6rem] xl:h-[4.6rem] px-4 md:px-4 xl:px-4 transition-transform duration-300 ${
					isVisible ? "translate-y-0" : "-translate-y-full"
				} flex items-center`}>
				{/* MOBILE: widoczny tylko na < md */}
				<div className="flex items-center w-full md:hidden">
					{/* Logo */}
					<Link href="/" className="md:ml-0">
						<img
							src="https://9.allegroimg.com/s1024/0cbde8/0f4e067c4432bfe3642da1782279"
							alt="Logo"
							className="w-[200px] md:w-[200px] xl:w-[201px] h-[5.32rem] md:h-[5.32rem] xl:h-[5.32rem]"
						/>
					</Link>

					{/* Burger */}
					<button
						className="focus:outline-none ml-auto mr-4"
						onClick={toggleMobileMenu}>
						<motion.div
							animate={isMobileMenuOpen ? "open" : "closed"}
							variants={iconVariants}
							transition={{ duration: 0.5 }}
							style={{
								originX: 0.5,
								originY: 0.5,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<motion.div
								style={{ position: "absolute" }}
								initial={{ opacity: 1 }}
								animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
								transition={{
									duration: 0.15,
									delay: isMobileMenuOpen ? 0 : 0.25,
								}}>
								<FaBars className="text-[#000000]" size={24} />
							</motion.div>
							<motion.div
								style={{ position: "absolute" }}
								initial={{ opacity: 0 }}
								animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
								transition={{
									duration: 0.15,
									delay: isMobileMenuOpen ? 0.25 : 0,
								}}>
								<FaTimes className="text-[#000000]" size={24} />
							</motion.div>
						</motion.div>
					</button>
				</div>

				{/* TABLET: widoczny na md, ukryty na xl */}
				<div className="hidden md:flex xl:hidden w-full items-center space-x-6 relative">
					{/* Logo po lewej */}
					<Link href="/" className="mr-auto">
						<img
							src="https://9.allegroimg.com/s1024/0cbde8/0f4e067c4432bfe3642da1782279"
							alt="Logo"
							className="w-[200px] md:w-[200px] xl:w-[201px] h-[5.32rem] md:h-[5.32rem] xl:h-[5.32rem]"
						/>
					</Link>

					{/* Linki */}
					<div className="space-x-6">
						{navItems.map((item) => (
							<NavLink key={item.href} label={item.label} href={item.href} />
						))}
					</div>
				</div>

				{/* DESKTOP: widoczny na >= xl */}
				<div className="hidden xl:flex w-full items-center space-x-6 relative">
					{/* Logo po lewej */}
					<Link href="/" className="mr-auto">
						<img
							src="https://9.allegroimg.com/s1024/0cbde8/0f4e067c4432bfe3642da1782279"
							alt="Logo"
							className="w-[200px] md:w-[200px] xl:w-[201px] h-[5.32rem] md:h-[5.32rem] xl:h-[5.32rem]"
						/>
					</Link>

					{/* Linki */}
					<div className="space-x-6">
						{navItems.map((item) => (
							<NavLink key={item.href} label={item.label} href={item.href} />
						))}
					</div>
				</div>
			</motion.nav>

			{/* Mobile menu panel (overlay + panel) */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						{/* Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed inset-0 bg-black z-40 md:hidden"
							onClick={toggleMobileMenu}
						/>

						{/* Panel menu */}
						<motion.div
							initial={{ x: "-100%" }}
							animate={{ x: 0 }}
							exit={{ x: "-100%" }}
							transition={{ duration: 0.3 }}
							className={`fixed z-50 md:hidden bg-[#303030] md:bg-[#303030] xl:bg-[#303030] left-0 md:left-0 xl:left-0 w-[75%] md:w-[75%] xl:w-[75%] shadow-md`}
							style={{
								top: "4.6rem",
								height: "calc(var(--vh, 1vh) * 100 - 4.6rem)",
							}}>
							<div
								className={`mt-6 flex flex-col px-6 gap-4 md:gap-4 xl:gap-4 text-left md:text-left xl:text-left`}>
								{navItems.map((item) => (
									<NavLink
										key={item.href}
										label={item.label}
										href={item.href}
										onClick={toggleMobileMenu}
									/>
								))}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navbar;
