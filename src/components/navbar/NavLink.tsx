import { FC, ReactNode, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
	label?: string;
	href: string;
	children?: ReactNode;
	onClick?: () => void;
}

const NavLink: FC<NavLinkProps> = ({ label, href, children, onClick }) => {
	const router = useRouter();
	const isActive = router.pathname === href;
	const [isHovered, setIsHovered] = useState(false);
	const linkRef = useRef<HTMLSpanElement>(null);
	const [underlineWidth, setUnderlineWidth] = useState(0);

	useEffect(() => {
		if (linkRef.current) {
			setUnderlineWidth(linkRef.current.offsetWidth);
		}
	}, [linkRef]);

	return (
		<Link
			href={href}
			onClick={onClick}
			className="text-[#000000] md:text-[#000000] xl:text-[#000000] hover:text-[#000000] md:hover:text-[#000000] xl:hover:text-[#000000] text-base md:text-base xl:text-base font-normal md:font-normal xl:font-normal normal-case md:normal-case xl:normal-case tracking-normal md:tracking-normal xl:tracking-normal transition-colors duration-300 relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<span ref={linkRef}>{children ? children : label}</span>
		</Link>
	);
};

export default NavLink;
