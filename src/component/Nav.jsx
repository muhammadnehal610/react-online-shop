import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,

  // Flex, // Make sure Flex is imported from "@nextui-org/react"
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";
import { AutoComplete, Flex, Input } from "antd";
import { useContext, useState } from "react";
import { AuthContex } from "../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "sonner";
// import { SearchIcon } from "./SearchIcon";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContex);

  console.log("user in header", user);

  const handleLogOUt = async () => {
    signOut(auth)
      .then(() => {
        toast.success("Event has been created");
        console.log("signout successful");
      })
      .catch((err) => {
        alert(err);
      });
  };
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const Title = (props) => (
    <Flex align="center" justify="space-between">
      {props.title}
      <a
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </Flex>
  );

  const renderItem = (title) => ({
    value: title,
    label: (
      <Flex align="center" justify="space-between">
        {title}
      </Flex>
    ),
  });

  const options = [
    {
      label: <Title title="Libraries" />,
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    },
    {
      label: <Title title="Solutions" />,
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: <Title title="Articles" />,
      options: [renderItem("AntDesign design language", 100000)],
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden" // Make sure the hidden class works if using Tailwind CSS
        />

        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent>
        <NavbarItem>
          <AutoComplete
            dropdownClassName="certain-category-search-dropdown" // Updated to "dropdownClassName"
            dropdownMatchSelectWidth={500} // Updated to "dropdownMatchSelectWidth"
            style={{
              width: 250,
            }}
            options={options}
            size="large"
          >
            <Input.Search size="large" placeholder="input here" />
          </AutoComplete>
        </NavbarItem>
      </NavbarContent>

      {user.isLogin ? (
        <NavbarContent as="div" justify="end" className="flex">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={user.userInfo?.image}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.userInfo?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogOUt}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="   hidden md:flex  ">
            <h1>{user.userInfo?.name}</h1>
          </div>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link>
              <RouterLink to={"/auth/signin"}>Login </RouterLink>
            </Link>{" "}
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" variant="flat">
              <RouterLink to={"/auth/signup"}>Sign Up</RouterLink>
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Nav;
