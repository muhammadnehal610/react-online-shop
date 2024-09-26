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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";
import { Avatar } from "antd";
import { useContext, useState } from "react";
import { AuthContex } from "../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "sonner";
import { UserOutlined } from "@ant-design/icons";
import { ProductContext } from "../context/productContex";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContex);
  const { products, loading } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogOUt = async () => {
    signOut(auth)
      .then(() => {
        toast.success("You have successfully logged out.");
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

  // Ensure that products.products is defined, or fallback to an empty array
  const filteredProducts =
    products?.products?.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const handleSearch = () => {
    console.log(`Search triggered for: ${search}`);
    // Perform search logic here, like navigating to a search results page
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />

        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
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
        {loading ? (
          <Spinner />
        ) : (
          <NavbarItem>
            <Autocomplete
              freeSolo
              open={open && search.length > 0}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              options={filteredProducts.map((product) => product.title)}
              onInputChange={(event, value) => setSearch(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Products"
                  variant="outlined"
                  sx={{ width: 250 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                      setOpen(false);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSearch}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              noOptionsText="No results found"
            />
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarItem>
        <Badge count={cartItem.length}>
          <ShoppingCartOutlined className="text-3xl" />
        </Badge>
      </NavbarItem>
      {user.isLogin ? (
        <NavbarContent as="div" justify="end" className="flex">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                size={"large"}
                icon={<UserOutlined />}
                src={user.userInfo?.image}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.userInfo?.email} </p>
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
          <div className="hidden md:flex">
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
