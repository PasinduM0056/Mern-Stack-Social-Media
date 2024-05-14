import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";
import "./updateOrganization.css";
export default function UpdateProfilePage(isBusiness, isOrganization) {
  const [user, setUser] = useRecoilState(userAtom);
  const [isBusinessAccount, setIsBusinessAccount] = useState(isBusiness);
  const [isOrganizationAccount, setIsOrganizationAccount] =
    useState(isOrganization);
  const [inputs, setInputs] = useState({
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
    name: user.name || "",
    address: user.address || "",
    idNumber: user.idNumber || "",
    companyName: user.companyName || "",
    companyAbout: user.companyAbout || "",
    OrganizationName: user.OrganizationName || "",
    OrganizationAddress: user.OrganizationAddress || "",
    OrganizationAbout: user.OrganizationAbout || "",
    IDnumber: user.IDnumber || "",
    password: "",
  });
  const fileRef = useRef(null);
  const [updating, setUpdating] = useState(false);

  const showToast = useShowToast();

  const { handleImageChange, imgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json(); // updated user object
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Profile updated successfully", "success");
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    // Fetch isBusiness status when component mounts
    checkIsBusiness();
    checkIsOrganization();
  }, []);

  const checkIsBusiness = async () => {
    try {
      const res = await fetch("/api/users/check-business", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }

      // Update isBusinessAccount state based on the response
      setIsBusinessAccount(data.isBusiness);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const checkIsOrganization = async () => {
    try {
      const res = await fetch("/api/users/check-organization", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }

      // Update isOrganizationAccount state based on the response
      setIsOrganizationAccount(data.isOrganization);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <div>
      <div
        className="update-company-info-up-container"
        style={{
          minWidth: "230vh",
          height: "30vh",
          marginLeft: "-40vh",
		  marginTop:'1vh',
		  display:'flex',
		 
		  alignItems:'center'
        }}
      >
        <div class="update-info-tooltip-container">
            <span class="update-info-tooltip-1">Consistency</span>
            <span class="update-info-tooltip-2">Accuracy</span>
            <span class="update-info-tooltip-3">Relevance</span>
            <span>Update company Information</span>
          </div>

      </div>
      <div className="update-company-info-full-form">
        <div className="update-company-info-form-container">
          <form className="update-company-info-form" onSubmit={handleSubmit}>
            <Flex align={"center"} justify={"center"} my={6}>
              <Stack>
                {isBusinessAccount || isOrganizationAccount ? (
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                  >
                    {isOrganizationAccount
                      ? "Update Organization Profile"
                      : "Update Business Profile"}
                  </Heading>
                ) : (
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                  >
                    Update User Profile
                  </Heading>
                )}

                <FormControl id="userName">
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        boxShadow={"md"}
                        src={imgUrl || user.profilePic}
                      />
                    </Center>
                    <Center w="full">
                      <Button w="full" onClick={() => fileRef.current.click()}>
                        Change Avatar
                      </Button>
                      <Input
                        type="file"
                        hidden
                        ref={fileRef}
                        onChange={handleImageChange}
                      />
                    </Center>
                  </Stack>
                </FormControl>

                {!(isBusinessAccount || isOrganizationAccount) && (
                  <>
                    <FormControl>
                      <FormLabel>User name</FormLabel>
                      <Input
                        placeholder="johndoe"
                        value={inputs.username}
                        onChange={(e) =>
                          setInputs({ ...inputs, username: e.target.value })
                        }
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        placeholder="your-email@example.com"
                        value={inputs.email}
                        onChange={(e) =>
                          setInputs({ ...inputs, email: e.target.value })
                        }
                        _placeholder={{ color: "gray.500" }}
                        type="email"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Bio</FormLabel>
                      <Input
                        placeholder="Your bio."
                        value={inputs.bio}
                        onChange={(e) =>
                          setInputs({ ...inputs, bio: e.target.value })
                        }
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                      />
                    </FormControl>
                  </>
                )}

                {(isOrganizationAccount || isBusinessAccount) && (
                  <>
                    {isOrganizationAccount && (
                      <>
                        <FormControl>
                          <FormLabel>Organization Name</FormLabel>
                          <Input
                            placeholder="Name"
                            value={inputs.OrganizationName}
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                OrganizationName: e.target.value,
                              })
                            }
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Organization Address</FormLabel>
                          <Input
                            placeholder="Address"
                            value={inputs.OrganizationAddress}
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                OrganizationAddress: e.target.value,
                              })
                            }
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Organization About</FormLabel>
                          <Input
                            placeholder="Your bio."
                            value={inputs.OrganizationAbout}
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                OrganizationAbout: e.target.value,
                              })
                            }
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>ID Number</FormLabel>
                          <Input
                            placeholder="ID Number"
                            value={inputs.IDnumber}
                            onChange={(e) =>
                              setInputs({ ...inputs, IDnumber: e.target.value })
                            }
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                          />
                        </FormControl>
                      </>
                    )}
                    {isBusinessAccount && (
                      <>
                        <FormControl>
                          <FormLabel>Business Name</FormLabel>
                          <Input
                            placeholder="Business Name"
                            value={inputs.companyName}
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                companyName: e.target.value,
                              })
                            }
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Business About</FormLabel>
                          <Input
                            placeholder="Business About"
                            value={inputs.companyAbout}
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                companyAbout: e.target.value,
                              })
                            }
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                          />
                        </FormControl>
                      </>
                    )}
                  </>
                )}

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="Password"
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs({ ...inputs, password: e.target.value })
                    }
                    _placeholder={{ color: "gray.500" }}
                    type="password"
                  />
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"green.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "green.500",
                    }}
                    type="submit"
                    isLoading={updating}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </form>
        </div>
      </div>
    </div>
  );
}
