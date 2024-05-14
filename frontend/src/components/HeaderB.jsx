import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill,  BsPeopleFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { FiShoppingCart, FiBriefcase } from 'react-icons/fi';

const HeaderB = () => {
	
	const user = useRecoilValue(userAtom);
	
	;

	return (
		<Flex justifyContent={"space-between"} mt={10} mb='10'>
			
			<Flex alignItems={"center"} gap={60}>
                    <Link as={RouterLink} to='/'>
                        <AiFillHome size={24} />
                    </Link>
					<Link as={RouterLink} to='/business'>
                        <FiShoppingCart size={24} />
                    </Link>
					<Link as={RouterLink} to={`/organization-job`}>
						< FiBriefcase size={20} /> {/* Using BsPeopleFill icon */}
					</Link>
					<Link as={RouterLink} to={`/consultant`}>
						<BsPeopleFill size={20} /> {/* Keeping BsPeopleFill for "consultant" */}
					</Link>
					
				</Flex>
		</Flex>
	);
};

export default HeaderB;
